import { hash, compare } from 'bcryptjs';
import { AppError } from './AppError';


const utils = {
    hashPassword: async (password: string): Promise<string> => {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    },
    decryptPassword: async (hashedPassword: string, password: string): Promise<boolean> => {
        return await compare(password, hashedPassword);
    },
    validEmail: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.toLocaleLowerCase());
    },
    validPassword: (password: string): boolean => {
        // Example validation: at least 8 characters, one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    },
    validName: (name: string): boolean => {
        // Example validation: at least 2 characters, only letters and spaces
        const nameRegex = /^[A-Za-z\s]{2,}$/;
        return nameRegex.test(name);
    },
    validateCreateUserInput: (data: { email: string; password: string; name: string }): boolean => {
        return utils.validEmail(data.email) && utils.validPassword(data.password) && utils.validName(data.name);
    },

    validPIN: (pin: string): boolean => {
        const pinRegex = /^(\d{4}|\d{6})$/;
        return pinRegex.test(pin);
    },
    formatEmail: (email: string) => {
        let formatted = email.trim();
        formatted = formatted.toLowerCase();
        // Collapse multiple spaces inside (shouldn’t normally exist but just in case)
        formatted = formatted.replace(/\s+/g, "");
        return formatted;
    },
    dataParser: (dmy: string) => {
        if (!dmy || typeof dmy !== "string") {
            throw new AppError("Date input required", 400);
        }

        // Normalize: trim spaces, replace "-" with "/", collapse multiple slashes
        const normalized = dmy.trim().replace(/-/g, "/").replace(/\s+/g, "").replace(/\/+/g, "/");
        const dmyParts = normalized.split("/").filter(Boolean);

        let start: Date;
        let end: Date;

        if (dmyParts.length === 3) {
            // dd/mm/yyyy
            const [day, month, year] = dmyParts.map(Number);
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                throw new AppError("Invalid date numbers", 400);
            }
            start = new Date(year, month - 1, day, 0, 0, 0, 0);
            end = new Date(year, month - 1, day, 23, 59, 59, 999);
        } else if (dmyParts.length === 2) {
            // mm/yyyy
            const [month, year] = dmyParts.map(Number);
            if (isNaN(month) || isNaN(year)) {
                throw new AppError("Invalid month/year numbers", 400);
            }
            start = new Date(year, month - 1, 1, 0, 0, 0, 0);
            end = new Date(year, month, 0, 23, 59, 59, 999);
        } else if (dmyParts.length === 1) {
            // yyyy
            const year = Number(dmyParts[0]);
            if (isNaN(year)) {
                throw new AppError("Invalid year number", 400);
            }
            start = new Date(year, 0, 1, 0, 0, 0, 0);
            end = new Date(year, 11, 31, 23, 59, 59, 999);
        } else {
            throw new AppError("Invalid date format. Use dd/mm/yyyy, mm/yyyy, or yyyy", 400);
        }

        return {start, end} ;
    }



};










export default utils