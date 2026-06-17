import { pgTable, serial, text, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioTable = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  demoUrl: text("demo_url").notNull(),
  category: text("category").notNull(),
});

export const insertPortfolioSchema = createInsertSchema(portfolioTable).omit({ id: true });
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type PortfolioItem = typeof portfolioTable.$inferSelect;
