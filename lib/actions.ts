"use server";

import { db } from "./db";
import { posts } from "./schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPostById(id: number) {
  const result = await db.select().from(posts).where(eq(posts.id, id));
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
    .where(eq(posts.id, id));

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
    .where(eq(posts.id, id));

  revalidatePath(`/article/${id}`);
  revalidatePath(`/edit/${id}`);

  return { ok: true, savedAt: new Date().toISOString() };
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/tuche");
  revalidatePath("/");
}
