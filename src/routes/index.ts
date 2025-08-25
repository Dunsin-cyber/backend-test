import express from 'express';
import authRoutes from './auth.routes';
import transactionRoutes from './transaction.routes';
import { ensureAuthenticated } from "@/middlewares/index"
import userRoutes from "./user.routes"
import donationRoutes from "./donation.routes"


const router = express.Router();


router.use("/auth", authRoutes);
router.use("/tx", ensureAuthenticated, transactionRoutes)
router.use("/donation", ensureAuthenticated, donationRoutes)
router.use("/user", ensureAuthenticated, userRoutes)

export default router