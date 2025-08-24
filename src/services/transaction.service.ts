
import { PrismaClient, User } from '@prisma/client'
import utils from '@/utils/index';
import { AppError } from '@/utils/AppError';
import { paginate } from '@/utils/pagintion';

const prisma = new PrismaClient()


export const setTransactionPIN = async (userId: string, pin: number) => {
    const hashedPin = await utils.hashPassword(pin.toString());
    return await prisma.user.update({
        where: { id: userId },
        data: { transactionPIN: hashedPin }
    });
};



//MAIN FUNCTION
// ------------------------------------- START -----------------------
// TODO : disable send to self
export const createDonation = async (
    donor: User,
    beneficiaryId: string,
    amount: number,
    txPIN: string
) => {
    if (amount <= 0) {
        throw new AppError("Donation amount must be greater than 0 :(", 400);
    }

    if (!await utils.decryptPassword(donor.transactionPIN!, txPIN)) {
        throw new AppError("Invalid transaction PIN", 401);
    }


    const data = await prisma.$transaction(async (tx) => {

        const donorWallet = await tx.wallet.findUnique({
            where: { userId: donor.id },
            select: { balance: true }
        });

        if (!donorWallet) {
            throw new AppError("Donor wallet not found", 404);
        }

        if (donorWallet.balance < amount) {
            throw new AppError("Insufficient balance to make donation", 400);
        }

        const beneficiaryWallet = await tx.wallet.findUnique({
            where: { userId: beneficiaryId },
            select: { balance: true }
        });

        if (!beneficiaryWallet) {
            throw new AppError("Beneficiary wallet not found", 404);
        }


        const donated = await tx.donation.create({
            data: {
                amount,
                donorId: donor.id,
                beneficiaryId
            }
        });

        // -------------------------STARTS HERE
        await tx.wallet.update({
            where: { userId: donor.id },
            data: { balance: { decrement: amount } }
        });


        await tx.wallet.update({
            where: { userId: beneficiaryId },
            data: { balance: { increment: amount } }
        });

        // -------------------------STARTS HERE


        return donated
    });

    return data
};

// ------------------------------------- END -----------------------


export const countUserDonations = async (userId: string) => {
    return prisma.donation.count({
        where: { donorId: userId }
    });
};



// TODO: filter my dmy and merge it into getUserDonations
export const donationsInPeriod = async (userId: string, start: Date, end: Date, page?: string, limit?: string) => {
    var page_;
    var limit_;
    if (page) {
        page_ = +page;

    }
    if (limit) {
        limit_ = +limit;

    }
    const data = await paginate({
        model: 'donation',
        where: {
            donorId: userId,
            createdAt: { gte: start, lte: end }
        },
        orderBy: { createdAt: 'desc' },
        page: page_,
        limit: limit_
    });
    return data;
};



export const getDonationById = async (donationId: string) => {
    const data = prisma.donation.findUnique({
        where: { id: donationId }
        // include: { beneficiary: true, donor: true }
    });

    return data;
};


