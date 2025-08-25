import utils from "@/utils";
import { paginate } from "@/utils/pagintion";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient()


export const setTransactionPIN = async (userId: string, pin: number) => {
    const hashedPin = await utils.hashPassword(pin.toString());
    return await prisma.user.update({
        where: { id: userId },
        data: { transactionPIN: hashedPin }
    });
};



export const getUserTransactions = async (userId: string, date?: { start?: Date; end?: Date },
    page?: string,
    limit?: string) => {

    const where: any = {
        entries: {
            some: {
                wallet: {
                    userId
                }
            }
        }
    };

    if ((date && date.start) && date.start) {
        where.createdAt = {
            gte: date.start,
            lte: date.end,
        };
    }


    return paginate({
        model: "transaction",
        where,
        orderBy: { createdAt: "desc" },
        page: page ? +page : undefined,
        limit: limit ? +limit : undefined,
        include: { entries: true, donation: true }
    });


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
