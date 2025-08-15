import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import jwt from "jsonwebtoken";
import { config } from "@/constants";
import { getUserById } from "@/services/auth.service";
import { User } from '@prisma/client';


export const ensureAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token)

    if (!token) {
        throw new AppError("Not authenticated", 401);
    }

    const decoded = jwt.verify(token, config.JWT_SECRET!) as { userId: string };
    const user = await getUserById(decoded.userId)
    if (user) {
        // req.user = user;
    (req as Request & {user: User}).user = user;
        next();
    } else {
        throw new AppError("User does not exist", 401);

    }
})