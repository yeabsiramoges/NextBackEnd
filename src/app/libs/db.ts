import { MongoClient } from "mongodb";

if (!process.env.MONGO_URL) {
    throw new Error("Missing DATABASE_URL in .env");
}

if (!process.env.DATABASE_NAME) {
    throw new Error("Missing DATABASE_NAME in .env");
}

console.log(process.env.DATABASE_NAME)

const client = new MongoClient(process.env.MONGO_URL)
client.connect()
export default client.db(process.env.DATABASE_NAME)