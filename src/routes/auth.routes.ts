import express from 'express';
import { handleCreateAcc } from "@/controllers/auth.controller"
const router = express.Router();



router.post('/create', handleCreateAcc)


export default router;
