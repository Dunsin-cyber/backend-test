import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { createUser } from '@/services/auth.service';
import utils from '@/utils/index';
import jwt from 'jsonwebtoken';
import { config } from '@/constants';


export const handleCreateAcc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validInput = utils.validateCreateUserInput(req.body);
    if (!validInput) {
         throw (new AppError("Invalid input data", 400));
    }
    const user = await createUser(req.body);
    

    const accessToken = jwt.sign(
        { userId: user.id },
        config.JWT_SECRET!,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        config.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    // Set refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(new ApiResponse("success", {user, accessToken}));

})

