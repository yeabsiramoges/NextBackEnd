/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            ['next-superjson-plugin', {}]
        ]
    },
    reactStrictMode: true,
    images: {
        domains: [
            'res.cloudinary.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ],
        remotePatterns: [
        {
            protocol: "https",
            hostname: "*.googleusercontent.com",
            port: "",
            pathname: "**",
        },
        ],
    },
}

module.exports = nextConfig
