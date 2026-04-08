import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  author: text("author").notNull(),
  artwork: text("artwork"),
  coverImage: text("cover_image"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
