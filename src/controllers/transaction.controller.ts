import { asyncHandler } from "@/middlewares/asyncHandler";
import { setTransactionPIN } from "@/services/transaction.service";
import utils from "@/utils";
import { ApiResponse } from "@/utils/ApiResponse";
import { AppError } from "@/utils/AppError";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";





export const handleCreateTxPIN = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validInput = utils.validPIN(req.body.pin);
    if (!validInput) {
        throw (new AppError("Invalid pin format", 400));
    }

    const user = (req as Request & { user?: User }).user!
    await setTransactionPIN(user.id, req.body.pin);


    return res.status(201).json(new ApiResponse("success", "Pin created successfully"));

})


export const handleGetUserTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {


})