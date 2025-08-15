import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { setTransactionPIN, createDonation } from '@/services/transaction.service';
import { getUserPrivateFn } from '@/services/auth.service';

import utils from '@/utils/index';
import { User } from '@prisma/client';



export const handleCreateTxPIN = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validInput = utils.validPIN(req.body);
    if (!validInput) {
        throw (new AppError("Invalid pin format", 400));
    }

    const user = (req as Request & { user?: User }).user!
    await setTransactionPIN(user.id, req.body);


    return res.status(200).json(new ApiResponse("success", "Pin created successfully"));

})


export const handleCreateDonation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //TODO: check if both params are wrong too
    const { amount, beneficiaryEmail } = req.body
    if (!amount || !utils.validEmail(beneficiaryEmail)) {
        throw (new AppError("Invalid input data", 400));
    }

    const beneficiary = await getUserPrivateFn(req.body.beneficiaryEmail);



    const user = (req as Request & { user?: User }).user!
    const donation = await createDonation(user.id, beneficiary.id, req.body.amount);


    return res.status(200).json(new ApiResponse("success", donation));

})

