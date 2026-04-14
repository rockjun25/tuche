"use server";

import { db } from "./db";
import { posts, learningProgress } from "./schema";
import { eq, desc, isNull, and, isNotNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
  return db
    .select()
    .from(posts)
    .where(isNull(posts.deletedAt))
    .orderBy(desc(posts.createdAt));
}

export async function getTrashedPosts() {
  return db
    .select()
    .from(posts)
    .where(isNotNull(posts.deletedAt))
    .orderBy(desc(posts.updatedAt));
}

export async function getPostById(id: number) {
  const result = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, id), isNull(posts.deletedAt)));
  return result[0] ?? null;
}

export async function createPost(formData: {
  title: string;
  subtitle?: string;
  author: string;
  artwork?: string;
  coverImage?: string;
  content: string;
}) {
  const result = await db
    .insert(posts)
    .values({
      title: formData.title,
      subtitle: formData.subtitle || null,
      author: formData.author,
      artwork: formData.artwork || null,
      coverImage: formData.coverImage || null,
      content: formData.content,
    })
    .returning();

  const inserted = result[0];
  revalidatePath("/tuche");
  redirect(`/article/${inserted.id}`);
}

export async function updatePost(
  id: number,
  formData: {
    title: string;
    subtitle?: string;
    author: string;
    artwork?: string;
    coverImage?: string;
    content: string;
  }
) {
  await db
    .update(posts)
    .set({
      title: formData.title,
      subtitle: formData.subtitle || null,
      author: formData.author,
      artwork: formData.artwork || null,
      coverImage: formData.coverImage || null,
      content: formData.content,
      updatedAt: new Date(),
    })
    .where(and(eq(posts.id, id), isNull(posts.deletedAt)));

  revalidatePath("/tuche");
  revalidatePath(`/article/${id}`);
  redirect(`/article/${id}`);
}

export async function autosavePost(
  id: number,
  formData: {
    title: string;
    subtitle?: string;
    author: string;
    artwork?: string;
    coverImage?: string;
    content: string;
  }
) {
  await db
    .update(posts)
    .set({
      title: formData.title,
      subtitle: formData.subtitle || null,
      author: formData.author,
      artwork: formData.artwork || null,
      coverImage: formData.coverImage || null,
      content: formData.content,
      updatedAt: new Date(),
    })
    .where(and(eq(posts.id, id), isNull(posts.deletedAt)));

  revalidatePath(`/article/${id}`);
  revalidatePath(`/edit/${id}`);

  return { ok: true, savedAt: new Date().toISOString() };
}

export async function deletePost(id: number) {
  await db
    .update(posts)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(posts.id, id), isNull(posts.deletedAt)));

  revalidatePath("/tuche");
  revalidatePath("/tuche/trash");
  revalidatePath("/");
}

export async function restorePost(id: number) {
  await db
    .update(posts)
    .set({
      deletedAt: null,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id));

  revalidatePath("/tuche");
  revalidatePath("/tuche/trash");
}

export async function permanentlyDeletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/tuche");
  revalidatePath("/tuche/trash");
}

export async function getProgressMap(classKey: string) {
  const rows = await db
    .select({ itemId: learningProgress.itemId, completed: learningProgress.completed })
    .from(learningProgress)
    .where(eq(learningProgress.classKey, classKey));

  return Object.fromEntries(rows.map((row) => [row.itemId, row.completed]));
}

export async function setProgress(
  classKey: string,
  itemId: string,
  completed: boolean
) {
  await db
    .insert(learningProgress)
    .values({
      classKey,
      itemId,
      completed,
      completedAt: completed ? new Date() : null,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [learningProgress.classKey, learningProgress.itemId],
      set: {
        completed,
        completedAt: completed ? new Date() : null,
        updatedAt: new Date(),
      },
    });

  return { ok: true };
}
