import { hash, compare } from 'bcryptjs';
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


};










export default utils