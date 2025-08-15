import express from 'express';
import authRoutes from './auth.routes';
import transactionRoutes from './transaction.routes';
import { ensureAuthenticated } from "@/middlewares/index"



const router = express.Router();


router.use("/auth", authRoutes);
router.use("/tx", ensureAuthenticated, transactionRoutes)

export default router