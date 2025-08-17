
import { PrismaClient, User } from '@prisma/client'
import utils from '@/utils/index';
import { AppError } from '@/utils/AppError';


const prisma = new PrismaClient()


export const setTransactionPIN = async (userId: string, pin: number) => {
    const hashedPin = await utils.hashPassword(pin.toString());
    return await prisma.user.update({
        where: { id: userId },
        data: { transactionPIN: hashedPin }
    });
};



//MAIN FUNCTION
export const createDonation = async (
    donor: User,
    beneficiaryId: string,
    amount: number,
    txPIN: number
) => {
    if (amount <= 0) {
        throw new AppError("Donation amount must be greater than 0 :(", 400);
    }

    // TODO: check for transcation pin if user has created one or if it matches
    if(!utils.decryptPassword(donor.transactionPIN,txPIN.toString())) {
        throw new AppError("Invalid transaction PIN", 401);
    }


    await prisma.$transaction(async (tx) => {

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


        await tx.donation.create({
            data: {
                amount,
                donorId,
                beneficiaryId
            }
        });


        await tx.wallet.update({
            where: { userId: donorId },
            data: { balance: { decrement: amount } }
        });


        await tx.wallet.update({
            where: { userId: beneficiaryId },
            data: { balance: { increment: amount } }
        });
    });
};




export const countUserDonations = async (userId: string) => {
    return prisma.donation.count({
        where: { donorId: userId }
    });
};


export const donationsInPeriod = async (userId: string, start: Date, end: Date) => {
    return prisma.donation.findMany({
        where: {
            donorId: userId,
            createdAt: { gte: start, lte: end }
        }
    });
};



export const getDonation = async (donationId: string) => {
    return prisma.donation.findUnique({
        where: { id: donationId },
        include: { beneficiary: true, donor: true }
    });
};
