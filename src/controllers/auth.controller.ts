import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByEmail } from '@/services/auth.service';
import utils from '@/utils/index';
import jwt from 'jsonwebtoken';
import { config } from '@/constants';


export const handleCreateAcc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validInput = utils.validateCreateUserInput(req.body);
    if (!validInput) {
        throw (new AppError("Invalid input data", 400));
    }
    const { email, password, name } = req.body;


    const emailExists = await getUserByEmail(email);
    if (emailExists) {
        throw new AppError("Email already exists", 409);
    }


    const user = await createUser({ password, name, email: utils.formatEmail(email) });


    const accessToken = jwt.sign(
        { userId: user.id },
        config.JWT_SECRET!,
        { expiresIn: "7d" }
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

    return res.status(200).json(new ApiResponse("success", { user, accessToken }));

})


export const handleLoginAcc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //TODO: check if both params are wrong too
    const { email, password } = req.body
    if (!utils.validPassword(password) || !utils.validEmail(email)) {
        throw (new AppError("Invalid input data", 400));
    }

    const user = await getUserByEmail(utils.formatEmail(email))
    if (!user) {
        throw new AppError("Check login Credentials", 404);
    }

    const isMatch = await utils.decryptPassword(user.password, password);
    if (!isMatch) {
        throw new AppError("Invalid email or password", 400);
    }


    const accessToken = jwt.sign(
        { userId: user.id },
        config.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        config.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    console.log(refreshToken);
    // Set refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(new ApiResponse("success", { user, accessToken }));

})


export const handleRefreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new AppError("Refresh token missing", 401);
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET!) as { userId: string };;
    console.log(decoded)
    const newAccessToken = jwt.sign({ userId: decoded.userId }, config.JWT_SECRET!, { expiresIn: "1d" });

    res.status(200).json(new ApiResponse("success", { accessToken: newAccessToken }));

})



export const handleLogout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken");
    res.status(200).json(new ApiResponse("success", "Logged out"));
})