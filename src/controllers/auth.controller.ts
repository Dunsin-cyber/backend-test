import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { NextFunction, Request, Response } from 'express';
import { createUser } from '@/services/auth.service';


export const handleCreateAcc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // TODO: user input validation
    const user = await createUser(req.body);
    // Send access token and user data
    return res.status(200).json(new ApiResponse("success", user));

})

