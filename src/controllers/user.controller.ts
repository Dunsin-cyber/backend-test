import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { getUserByEmail } from '@/services/auth.service';



export const handleGetUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: User }).user!

    const fulUserDetails = await getUserByEmail(user.email)
    return res.status(200).json(new ApiResponse("success", fulUserDetails));

})
