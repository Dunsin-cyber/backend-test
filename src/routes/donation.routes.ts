import express from 'express';
import { handleCreateDonation, handleGetUserDonations, handleFilterDonations, handleDonationDetails } from "@/controllers/donation.controller"
const router = express.Router();




/**
 * @swagger
 * /api/donation/create:
 *   post:
 *     summary: Create a donation transaction
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
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
 *               transactionPin:
 *                 type: string
 *                 description: User's 4 0r 6 digit transaction PIN 
 *                 example: "123456"
 *                 required: true        
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


router.post('/create', handleCreateDonation)


/**
 * @swagger
 * /api/donation/my-donations:
 *   get:
 *     summary: Get donations made by the user within a date range
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           minimum: 1
 *         required: false
 *         description: start date
 *         example: "01/02/2024"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           minimum: 1
 *         required: false
 *         description: end date
 *         example: "12/2025"
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
 *         description: list of donations made by the user
 */

router.get("/my-donations", handleFilterDonations);


/**
 * @swagger
 * /api/donation/{id}:
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
router.get("/:id", handleDonationDetails)




export default router;
