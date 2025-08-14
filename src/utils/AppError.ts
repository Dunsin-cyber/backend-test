export class AppError extends Error {
    public statusCode: number;
    public status: "fail" | "error";

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode < 500 ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }
}
