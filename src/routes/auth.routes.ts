import express from 'express';
import { handleCreateAcc } from "@/controllers/auth.controller"
const router = express.Router();


/** 
 * @swagger
 * /api/auth/create:
 *   post:
 *     summary: Creates a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/create', handleCreateAcc)


export default router;
