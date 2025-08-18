import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type PaginationParams<T> = {
    model: keyof PrismaClient;  
    page?: number;
    limit?: number;
    where?: any;
    orderBy?: any;
    include?: any;
};

export const paginate = async <T>({
    model,
    page = 1,
    limit = 10,
    where,
    orderBy,
    include,
}: PaginationParams<T>) => {
    const skip = (page - 1) * limit;

    const prismaModel = prisma[model] as any;

    const [data, total] = await Promise.all([
        prismaModel.findMany({
            skip,
            take: limit,
            where,
            orderBy,
            include,
        }),
        prismaModel.count({ where }),
    ]);

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
