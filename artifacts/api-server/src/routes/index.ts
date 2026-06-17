import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import ordersRouter from "./orders.js";
import analyticsRouter from "./analytics.js";
import portfolioRouter from "./portfolio.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(ordersRouter);
router.use(analyticsRouter);
router.use(portfolioRouter);

export default router;
