import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/ApiResponse";
import { AppError } from "@/utils/AppError";
import { Prisma } from "@prisma/client";
import { prismaErrorMap } from "@/utils/prismaErrors";

export const errorHandler = (
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = (err as AppError).statusCode || 500;
    let message = err.message;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // If Prisma gives us a code, check our map
        message = prismaErrorMap[err.code] || "Database error occurred.";
    } else if (
        err instanceof Prisma.PrismaClientUnknownRequestError ||
        err instanceof Prisma.PrismaClientInitializationError ||
        err instanceof Prisma.PrismaClientRustPanicError
    ) {
        message = "Internal database error. Please try again later.";
    }

    res.status(statusCode).json(new ApiResponse("fail", message));
};
