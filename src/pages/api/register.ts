import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export default async function handler(
    req: any, 
    res: any
) {
    const body = req.body
    const {
        email,
        name,
        password
    } = body;

    if (!email || !password || !name) {
        throw new Error("Missing info");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    res.status(200).json(user)
}

export { handler as POST, handler as GET }