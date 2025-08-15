import { PrismaClient, User } from '@prisma/client'
import utils from '@/utils/index';

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
