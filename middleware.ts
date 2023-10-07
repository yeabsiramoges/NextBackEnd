import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/"
    }
});

// protect pages from unneeded access
// the :path* protects every route that stems from /users
export const config = {
    matcher: [
        "/users:path*"
    ]
}