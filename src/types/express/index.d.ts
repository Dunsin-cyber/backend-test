import { User, Wallet } from "@prisma/client";

type UserWithWallet = User & { wallet?: Wallet | null };

declare global {
    namespace Express {
        interface Request {
            user?: UserWithWallet;
        }
    }
}

export { };
