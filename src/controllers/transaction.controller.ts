import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { setTransactionPIN, createDonation, getUserDonations, donationsInPeriod, getDonationById } from '@/services/transaction.service';
import { getUserPrivateFn } from '@/services/auth.service';

import utils from '@/utils/index';
import { User } from '@prisma/client';



export const handleCreateTxPIN = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validInput = utils.validPIN(req.body.pin);
    if (!validInput) {
        throw (new AppError("Invalid pin format", 400));
    }

    const user = (req as Request & { user?: User }).user!
    await setTransactionPIN(user.id, req.body.pin);


    return res.status(200).json(new ApiResponse("success", "Pin created successfully"));

})


export const handleCreateDonation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //TODO: check if both params are wrong too
    const { amount, beneficiaryEmail } = req.body
    const txPIN = req.query.transactionPin as string;
    if ((typeof amount != "number") || !utils.validEmail(beneficiaryEmail)) {
        throw (new AppError("Invalid input data", 400));
    }

    if (!txPIN || !utils.validPIN(+txPIN)) {
        throw (new AppError("Invalid transaction PIN", 401));
    }

    const beneficiary = await getUserPrivateFn(req.body.beneficiaryEmail);



    const user = (req as Request & { user?: User }).user!
    if (!user.transactionPIN) {
        throw new AppError("Please set a Transaction PIN first", 401);
    }
    const donation = await createDonation(user, beneficiary.id, amount, +txPIN);


    return res.status(200).json(new ApiResponse("success", donation));

})


export const handleGetUserDonations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: User }).user!
    if (!user) {
        throw new AppError("User not found", 404);
    }

    const { limit, page } = req.query;

    const donations = await getUserDonations(user.id, page as string, limit as string);

    return res.status(200).json(new ApiResponse("success", donations));
})


export const handleFilterDonations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: User }).user!

    const { start, end, limit, page } = req.query;
    if (!start || !end) {
        throw new AppError("Start and end dates are required", 400);
    }
    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new AppError("Invalid date format", 400);
    }

    const donations = await donationsInPeriod(user.id, startDate, endDate, page as string, limit as string);

    return res.status(200).json(new ApiResponse("success", donations));
}
)

export const handleDonationDetails = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const donationId = req.params.id;
    if (!donationId) {
        throw new AppError("Donation ID is required", 400);
    }

    const donation = await getDonationById(donationId);  

    return res.status(200).json(new ApiResponse("success", donation));
});