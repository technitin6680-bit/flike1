import { Router } from "express";
import { db, ordersTable } from "@workspace/db";
import { eq, ilike, or, sql, desc } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";
import { randomUUID } from "crypto";

const router = Router();

function generateOrderId() {
  return "FLK-" + Date.now().toString(36).toUpperCase() + "-" + randomUUID().slice(0, 4).toUpperCase();
}

router.get("/orders", requireAuth, async (req, res) => {
  const { status, search, page = "1", limit = "20" } = req.query as {
    status?: string;
    search?: string;
    page?: string;
    limit?: string;
  };

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const offset = (pageNum - 1) * limitNum;

  let query = db.select().from(ordersTable);

  const conditions: ReturnType<typeof eq>[] = [];
  if (status) {
    conditions.push(eq(ordersTable.status, status));
  }
  if (search) {
    conditions.push(
      or(
        ilike(ordersTable.name, `%${search}%`),
        ilike(ordersTable.email, `%${search}%`),
        ilike(ordersTable.projectName, `%${search}%`),
        ilike(ordersTable.orderId, `%${search}%`),
      ) as ReturnType<typeof eq>
    );
  }

  const baseQuery = conditions.length
    ? db.select().from(ordersTable).where(conditions.length === 1 ? conditions[0] : sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}`)
    : db.select().from(ordersTable);

  const allOrders = await baseQuery.orderBy(desc(ordersTable.createdAt));
  const total = allOrders.length;
  const orders = allOrders.slice(offset, offset + limitNum);

  res.json({
    orders: orders.map(o => ({
      ...o,
      createdAt: o.createdAt.toISOString(),
    })),
    total,
    page: pageNum,
    limit: limitNum,
  });
});

router.post("/orders", async (req, res) => {
  const body = req.body as {
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    websiteType: string;
    projectName: string;
    projectDescription: string;
    selectedFeatures: string[];
    estimatedPrice: number;
  };

  const orderId = generateOrderId();

  const [order] = await db.insert(ordersTable).values({
    orderId,
    name: body.name,
    email: body.email,
    phone: body.phone,
    company: body.company,
    country: body.country,
    websiteType: body.websiteType,
    projectName: body.projectName,
    projectDescription: body.projectDescription,
    selectedFeatures: body.selectedFeatures || [],
    estimatedPrice: body.estimatedPrice,
    status: "New Lead",
  }).returning();

  res.status(201).json({
    ...order,
    createdAt: order.createdAt.toISOString(),
  });
});

router.get("/orders/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id)).limit(1);

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json({ ...order, createdAt: order.createdAt.toISOString() });
});

router.patch("/orders/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  const body = req.body as { status?: string; name?: string; email?: string; phone?: string; company?: string };

  const updates: Partial<typeof body & { status: string }> = {};
  if (body.status) updates.status = body.status;
  if (body.name) updates.name = body.name;
  if (body.email) updates.email = body.email;
  if (body.phone) updates.phone = body.phone;
  if (body.company) updates.company = body.company;

  const [order] = await db.update(ordersTable).set(updates).where(eq(ordersTable.id, id)).returning();

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json({ ...order, createdAt: order.createdAt.toISOString() });
});

router.delete("/orders/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  await db.delete(ordersTable).where(eq(ordersTable.id, id));
  res.status(204).send();
});

export default router;
