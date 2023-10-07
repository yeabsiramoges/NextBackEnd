import getSession from "./getSession";

const getUsers = async () => {
    const session = await getSession();

    // Check if user is signed in
    if (!session?.user?.email) {
        return [];
    }

    // Get all users not including current user
    try {
        const users = await prisma?.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        })

        return users;
    } catch (error: any) {
        return [];
    }
}

export default getUsers;