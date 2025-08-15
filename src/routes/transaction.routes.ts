import express from 'express';
import { handleCreateTxPIN, handleCreateDonation } from "@/controllers/transaction.controller"
const router = express.Router();


/**
 * @swagger
 * /api/tx/pin:
 *   post:
 *     summary: Creates a new user
 *     tags: [Donation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 description: Must be exactly 4 characters long, contain only numbers
 *                 minLength: 4
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Tx Pin created successfully
 */

router.post('/pin', handleCreateTxPIN)


/**
 * @swagger
 * /api/tx/create-donation:
 *   post:
 *     summary: Create a donation transaction
 *     tags: [Donation]
 *     parameters:
 *       - in: query
 *         name: transactionPin
 *         schema:
 *           type: string
 *           minLength: 4
 *           maxLength: 6
 *         required: true
 *         description: User's 4–6 digit transaction PIN
 *         example: "1234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - beneficiaryId
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to donate
 *                 example: 50.0
 *               beneficiaryId:
 *                 type: string
 *                 description: ID of the beneficiary receiving the donation
 *                 example: "clxyz123abc456def789ghi0"
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Invalid request payload or parameters
 *       401:
 *         description: Unauthorized — invalid transaction PIN
 *       500:
 *         description: Internal server error
 */


router.post('/create-donation', handleCreateDonation)

export default router;
