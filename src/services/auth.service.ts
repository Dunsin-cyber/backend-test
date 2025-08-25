import { PrismaClient, User } from '@prisma/client'
import utils from '@/utils/index';
import { AppError } from '@/utils/AppError';

const prisma = new PrismaClient()

type CreateUserT = {
    email: string;
    password: string;
    name: string;
}

export const createUser = async (data: CreateUserT) => {
    const { password } = data;
    const hashedPassword = await utils.hashPassword(password);

    const SYSTEM_WALLET_ID = "system";
    const amount = 100_000;


    return await prisma.$transaction(async (tx) => {
        // 1. Create user + wallet
        const user = await tx.user.create({
            data: {
                ...data,
                password: hashedPassword,
                wallet: { create: { balance: 0 } },
            },
            select: { id: true, name: true, email: true, wallet: true },
        });

        //  Fetch system wallet  transaction
        const systemWallet = await prisma.wallet.findUniqueOrThrow({
            where: { userId: SYSTEM_WALLET_ID },
        });

        if (systemWallet.balance < amount) {
            throw new Error("❌ System wallet has insufficient balance");
        }
        // 2. Create transaction
        const transaction = await tx.transaction.create({
            data: {
                type: "DEPOSIT",
                description: "Initial funding",
            },
        });

        // 3. Update balances in parallel
        const [updatedSystemWallet, updatedUserWallet] = await Promise.all([
            tx.wallet.update({
                where: { userId: systemWallet.userId },
                data: { balance: { decrement: amount } },
            }),
            tx.wallet.update({
                where: { userId: user.id },
                data: { balance: { increment: amount } },
            }),
        ]);

        // 4. Transaction entries (batch insert)
        await tx.transactionEntry.createMany({
            data: [
                {
                    transactionId: transaction.id,
                    walletId: systemWallet.userId,
                    amount: -amount,
                    balanceBefore: systemWallet.balance,
                    balanceAfter: updatedSystemWallet.balance,
                },
                {
                    transactionId: transaction.id,
                    walletId: user.id,
                    amount: amount,
                    balanceBefore: user.wallet!.balance,
                    balanceAfter: updatedUserWallet.balance,
                },
            ],
        });

        const {wallet, ...userWithoutWallet} = user;
        return userWithoutWallet;
    }, {
        timeout: 15000, // 15s instead of 5s
    });
};



export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            name: true,
            wallet: true,
            donations: true,
            received: true,
        },
    });

    return user;
};




export const getUserPrivateFn = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });


    return user;
};

//only used internally in middlerware
export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            wallet: true,
            donations: true,
            received: true
        }
    });
    return user
}
