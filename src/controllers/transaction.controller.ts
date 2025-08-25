import { asyncHandler } from "@/middlewares/asyncHandler";
import { setTransactionPIN, getUserTransactions, getBalanceFromTxs } from "@/services/transaction.service";
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

});


export const handleGetUserTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const user = (req as Request & { user?: User }).user!

    const { from, to, limit, page } = req.query;
    let startDate
    let endDate;

    if (from) {
        startDate = utils.dataParser(from as string)
    }
    if (to) {
        endDate = utils.dataParser(to as string)
    }

    if ((startDate && !endDate) || (!startDate && endDate)) {
        throw new AppError("There must be both start and end date", 401);
    }

    const date = { start: startDate?.start, end: endDate?.end }


    const txs = await getUserTransactions(user.id, date, page as string, limit as string);

    return res.status(200).json(new ApiResponse("success", txs));


})

export const handleGetUserBalance = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const user = (req as Request & { user?: User }).user!
    const txs = await getBalanceFromTxs(user.id);


    return res.status(200).json(new ApiResponse("success", txs));
})