import { PrismaClient, User } from '@prisma/client'
import utils from '@/utils/index';
import { AppError } from '@/utils/AppError';

const prisma = new PrismaClient()


// TODO: check if user exists first to thrpw a better error message
export const createUser = async (data: User) => {
    const { password } = data;
    const hashedPassword = await utils.hashPassword(password);

    const user = await prisma.user.create({
        data: {
            ...data, password: hashedPassword
        },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return user
}



export const getUser = async (data: { email: string; password: string }) => {
    const userWithPassword = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!userWithPassword) {
        throw new AppError("Invalid email or password", 401);
    }


    const isMatch = await utils.decryptPassword(userWithPassword.password, data.password);
    if (!isMatch) {
        throw new AppError("Invalid email or password",401);
    }


    const { password, ...safeUser } = userWithPassword;
    return safeUser;
};
