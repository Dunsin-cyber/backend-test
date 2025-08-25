import express from 'express';
import { handleGetUser } from "@/controllers/user.controller"
const router = express.Router();


/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Return logged in User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged in User
 */

router.post('/', handleGetUser)






export default router;
