import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUser = async (email: string, password: string, name?: string) => {
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: "USER",
            name
        }
    })

    return user;
};

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {email},
    })
};

// export const getUserById = async (id: string) => {
//     return await prisma.user.findUnique({
//       where: { id },
//     });
// };

