import prisma from "@/app/libs/prismadb";

import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        // Get current server session
        const session = await getSession();

        // Check if the currently logged in user has an email
        if (!session?.user?.email) {
            return null;
        }

        // Get user from db
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        // Check if user is returned
        if (!currentUser) {
            return null;
        }

        // If this point is reached then user exists and return them.
        return currentUser;

    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser;