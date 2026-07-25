import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Proteins | Garden | "Bowls & Grains"
  kcal: integer("kcal").notNull(),
  protein: integer("protein").notNull(),
  priceCents: integer("price_cents").notNull(),
  tags: text("tags").array().notNull().default([]),
  image: text("image").notNull(),
  sort: integer("sort").notNull().default(0),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sort: integer("sort").notNull().default(0),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  plan: text("plan"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type MealRow = typeof meals.$inferSelect;
export type FaqRow = typeof faqs.$inferSelect;
