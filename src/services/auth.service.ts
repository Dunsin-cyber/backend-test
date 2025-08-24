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


    const user = await prisma.user.create({
        data: {
            ...data, password: hashedPassword,
            wallet: {
                create: {}
            }
        }
    });
    const { password: _, transactionPIN, ...safeUser } = user;
    return safeUser
}



export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    return user
}





export const getUserPrivateFn = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

  
    return user;
};

//only used internally
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
