import express from 'express';
import { handleCreateTxPIN, handleGetUserTransactions } from "@/controllers/transaction.controller"
const router = express.Router();


/**
 * @swagger
 * /api/tx/pin:
 *   post:
 *     summary: Creates a transaction PIN
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 description: Must be exactly 4 or 6digits long
 *                 minLength: 4
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Tx Pin created successfully
 */

router.post('/pin', handleCreateTxPIN)

router.get("/", handleGetUserTransactions)



export default router;
