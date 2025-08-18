import express from 'express';
import { handleCreateTxPIN, handleCreateDonation, handleGetUserDonations, handleFilterDonations, handleDonationDetails } from "@/controllers/transaction.controller"
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
 *                 type: number
 *                 description: Must be exactly 4 digits long
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: transactionPin
 *         schema:
 *           type: string
 *           minLength: 4
 *           maxLength: 6
 *         required: true
 *         description: User's 4 digit transaction PIN
 *         example: "1234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - beneficiaryEmail
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to donate
 *                 example: 50.0
 *               beneficiaryEmail:
 *                 type: string
 *                 description: Email of the beneficiary receiving the donation
 *                 example: "dunsin@exmaple.com"
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Invalid request payload or parameters
 *       401:
 *         description: Unaut   horized — invalid transaction PIN
 *       500:
 *         description: Internal server error
 */


router.post('/create-donation', handleCreateDonation)

/**
 * @swagger
 * /api/tx/my-donations:
 *   get:
 *     summary: Get all donations made by the user
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Number of results per page
 *         example: 10
 *     responses:
 *       200:
 *         description: List of donations made by the user
 *       401:
 *         description: Unauthorized
 */

router.get("/my-donations", handleGetUserDonations);


/**
 * @swagger
 * /api/tx/filter-donations:
 *   get:
 *     summary: Filter donations made by the user within a date range
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Start date for filtering donations
 *         example: "2023-01-01T00:00:00Z"
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: End date for filtering donations
 *         example: "2025-12-31T23:59:59Z"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Number of results per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Filtered list of donations made by the user
 */

router.get("/filter-donations", handleFilterDonations );


/**
 * @swagger
 * /api/tx/donation/{id}:
 *   get:
 *     summary: Get details of a specific donation by ID
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the donation to retrieve
 *     responses:
 *       200:
 *         description: Donation details retrieved successfully
 *       404:
 *         description: Donation not found
 */
router.get("/donation/:id", handleDonationDetails)



export default router;
