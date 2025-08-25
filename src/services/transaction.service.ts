import utils from "@/utils";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient()


export const setTransactionPIN = async (userId: string, pin: number) => {
    const hashedPin = await utils.hashPassword(pin.toString());
    return await prisma.user.update({
        where: { id: userId },
        data: { transactionPIN: hashedPin }
    });
};



export const getUserTransactions = async (userId: string) => {
    const transactions = await prisma.transaction.findMany({
        where: {
            entries: {
                some: {
                    wallet: {
                        userId
                    }
                }
            }
        },
        include: {
            entries: true,
            donation: true,
        }
    });

    return transactions;
}


export const getBalanceFromTxs = async (userId: string) => {
    const result = await prisma.transactionEntry.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            walletId: userId,
        },
    });

    return result._sum.amount ?? 0; // default to 0 if null
};
