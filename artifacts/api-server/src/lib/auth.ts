import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "flike-secret-key-change-in-prod";

export function signToken(payload: { id: number; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
}

export type AuthRequest = Request & { user: { id: number; email: string; role: string } };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : (req as Request & { cookies?: Record<string, string> }).cookies?.["token"];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyToken(token);
    (req as AuthRequest).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
