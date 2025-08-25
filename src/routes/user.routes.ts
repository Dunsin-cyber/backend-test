import express from 'express';
import { handleGetUser } from "@/controllers/user.controller"
import { handleGetUserBalance } from '@/controllers/transaction.controller';
const router = express.Router();



/**
 * @swagger
 * /api/user/balance:
 *   get:
 *     summary: Return calcualted balance from transactions
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: user balance from transactions
 */


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Return logged in User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged in User
 */

router.get('/', handleGetUser)


router.get("/balance", handleGetUserBalance)






export default router;
