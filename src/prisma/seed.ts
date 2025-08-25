import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("dummy", 10);

    await prisma.user.upsert({
        where: { id: "system" },
        update: {},
        create: {
            id: "system",
            email: "system@paritiebackendtest.com",
            password: hashedPassword,
            name: "Paritie Account",
            wallet: {
                create: {
                    balance: 1_000_000_000, // your treasury balance
                },
            },
        },
    });

    console.log("✅Paritie System wallet initialized");
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
