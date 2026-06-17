import { Router } from "express";
import { db, portfolioTable } from "@workspace/db";

const router = Router();

router.get("/portfolio", async (_req, res) => {
  const items = await db.select().from(portfolioTable);
  res.json(items.map(i => ({
    ...i,
    technologies: i.technologies ?? [],
  })));
});

export default router;
