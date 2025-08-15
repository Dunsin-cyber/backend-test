import express from 'express';
import { handleCreateAcc, handleLoginAcc } from "@/controllers/auth.controller"
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
 *               name:
 *                 type: string
 *                 description: Must be at least 2 characters long, only letters and spaces allowed
 *                 minLength: 2
 *                 pattern: '^[A-Za-z ]+$'
 *                 example: Dunsin
 *               email:
 *                 type: string
 *                 description: Must be a valid email address
 *                 format: email
 *                 example: dunsin@example.com
 *               password:
 *                 type: string
 *                 description: Must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number
 *                 minLength: 8
 *                 pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: User created successfully
 */

router.post('/create', handleCreateAcc)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
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
 *                 description: Must be a valid email address
 *                 format: email
 *                 example: dunsin@example.com
 *               password:
 *                 type: string
 *                 description: Must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number
 *                 minLength: 8
 *                 pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: User created successfully
 */

router.post('/login', handleLoginAcc)


export default router;
