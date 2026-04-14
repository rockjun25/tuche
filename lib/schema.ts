import {
  pgTable,
  text,
  serial,
  timestamp,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";

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
  deletedAt: timestamp("deleted_at", { mode: "date" }),
});

export const learningProgress = pgTable(
  "learning_progress",
  {
    id: serial("id").primaryKey(),
    classKey: text("class_key").notNull(),
    itemId: text("item_id").notNull(),
    completed: boolean("completed").notNull().default(false),
    completedAt: timestamp("completed_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    classItemUnique: uniqueIndex("learning_progress_class_item_unique").on(
      table.classKey,
      table.itemId
    ),
  })
);

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
