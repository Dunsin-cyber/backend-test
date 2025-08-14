import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()


export const createUser = async (data: User) => {
    const user = await prisma.user.create({
        data
    });
    return user
}
