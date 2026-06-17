import { Router, type Request } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { signToken, requireAuth } from "../lib/auth.js";

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "lax" });

  res.json({
    user: { id: user.id, email: user.email, role: user.role },
    token,
  });
});

router.post("/auth/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

router.get("/auth/me", requireAuth, async (req, res) => {
  const authReq = req as Request & { user: { id: number; email: string; role: string } };
  res.json({ id: authReq.user.id, email: authReq.user.email, role: authReq.user.role });
});

export default router;
