import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/ApiResponse";
import { AppError } from "@/utils/AppError";
import { Prisma } from "@prisma/client";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err instanceof Prisma.PrismaClientKnownRequestError || Prisma.PrismaClientUnknownRequestError ? "Somehting went wrong" : err.message;

    res.status(statusCode).json(new ApiResponse("fail", message));
};
