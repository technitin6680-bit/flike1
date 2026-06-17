import { Router } from "express";
import { db, ordersTable } from "@workspace/db";
import { sql, eq } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

router.get("/analytics/summary", requireAuth, async (_req, res) => {
  const orders = await db.select().from(ordersTable);

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + o.estimatedPrice, 0);

  const newLeads = orders.filter(o => o.status === "New Lead").length;
  const inProgress = orders.filter(o => o.status === "In Progress").length;
  const completed = orders.filter(o => o.status === "Completed").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  res.json({ totalOrders, totalRevenue, newLeads, inProgress, completed, cancelled });
});

router.get("/analytics/revenue", requireAuth, async (_req, res) => {
  const orders = await db.select({
    month: sql<string>`to_char(${ordersTable.createdAt}, 'Mon YYYY')`,
    monthSort: sql<string>`to_char(${ordersTable.createdAt}, 'YYYY-MM')`,
    revenue: ordersTable.estimatedPrice,
  }).from(ordersTable);

  const grouped: Record<string, { month: string; revenue: number; orders: number }> = {};
  for (const o of orders) {
    if (!grouped[o.monthSort]) {
      grouped[o.monthSort] = { month: o.month, revenue: 0, orders: 0 };
    }
    grouped[o.monthSort].revenue += o.revenue;
    grouped[o.monthSort].orders += 1;
  }

  const result = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([, v]) => ({ month: v.month, revenue: Math.round(v.revenue), orders: v.orders }));

  res.json(result);
});

router.get("/analytics/leads", requireAuth, async (_req, res) => {
  const orders = await db.select().from(ordersTable);

  const grouped: Record<string, number> = {};
  for (const o of orders) {
    grouped[o.websiteType] = (grouped[o.websiteType] || 0) + 1;
  }

  const result = Object.entries(grouped)
    .sort(([, a], [, b]) => b - a)
    .map(([type, count]) => ({ type, count }));

  res.json(result);
});

export default router;
