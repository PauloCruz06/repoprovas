import { prisma } from "../config/database";
import { userData } from "../types/userType";

export async function createUser(user: userData) {
    await prisma.users.create({ data: user });
}

export async function findUsers() {
    const result = await prisma.users.findMany();
    return result;
}

export async function findUserByEmail(email: string) {
    const result = await prisma.users.findUnique({
        where: { email }
    });
    return result;
}