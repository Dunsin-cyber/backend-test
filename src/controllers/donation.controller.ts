import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { createDonation, donationsInPeriod, getDonationById } from '@/services/donation.service';
import { getUserPrivateFn } from '@/services/auth.service';
import { validate as uuidValidate } from 'uuid';
import utils from '@/utils/index';
import { User } from '@prisma/client';



export const handleCreateDonation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //TODO: check if both params are wrong too
    const { amount, beneficiaryEmail, transactionPin } = req.body
    if ((typeof amount != "number") || !utils.validEmail(beneficiaryEmail)) {
        throw (new AppError("Invalid input data", 400));
    }

    const user = (req as Request & { user?: User }).user!
    if (!user.transactionPIN) {
        throw new AppError("Please set a Transaction PIN first", 400);
    }
    if (!transactionPin || !utils.validPIN(transactionPin)) {
        throw (new AppError("Invalid transaction PIN", 401));
    }

    const beneficiary = await getUserPrivateFn(utils.formatEmail(beneficiaryEmail));

    if (!beneficiary) {
        throw new AppError("Beneficiary does not exist", 404);
    }



    if (utils.formatEmail(beneficiaryEmail) === user.email) {
        throw new AppError("You cannot Donate to Self", 401);
    }

    const donation = await createDonation(user, beneficiary.id, amount, transactionPin);


    return res.status(201).json(new ApiResponse("success", donation));

})

//! DEPRECATED TO FAVOUR handleFilterDonations
export const handleGetUserDonations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
})


export const handleFilterDonations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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



    const donations = await donationsInPeriod(user.id, date, page as string, limit as string);

    if (!donations) {
        throw new AppError("No donations found in this period", 404);

    }


    return res.status(200).json(new ApiResponse("success", donations));
}
)


export const handleDonationDetails = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const donationId = req.params.id;
    if (!donationId) {
        throw new AppError("Donation ID is required", 400);
    }
    const validUUID = uuidValidate(donationId);
    if (!validUUID) {
        throw new AppError("Invalid donation ID format", 400);
    }
    const donation = await getDonationById(donationId);

    if (!donation) {
        throw new AppError("Donation not found", 404);
    }

    return res.status(200).json(new ApiResponse("success", donation));
});