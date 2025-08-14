import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Default error values
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Handle operational errors (e.g., invalid input, missing resource)
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Log the error for debugging
        console.error('ERROR 💥', err);

        // Send a generic response for non-operational errors
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
};

export default globalErrorHandler;