import { pgTable, serial, text, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  country: text("country").notNull(),
  websiteType: text("website_type").notNull(),
  projectName: text("project_name").notNull(),
  projectDescription: text("project_description").notNull(),
  selectedFeatures: jsonb("selected_features").$type<string[]>().notNull().default([]),
  estimatedPrice: real("estimated_price").notNull(),
  status: text("status").notNull().default("New Lead"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, orderId: true, createdAt: true, status: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
