import { MongoClient, Db } from "mongodb";

export let cachedDb: Db;
export let mongodbClient: MongoClient;
require("dotenv").config();

async function connectToDatabase() {
  try {
    let mongoUrl = process.env.MONGO_URL as string;
    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log("=> Connected successfully to database");
    return client;
  } catch (error: any) {
    console.log("=> Error While connecting to database");
    console.error(error);
    throw error;
  }
}

export async function cachedDbConnection() {
  if (!cachedDb) {
    console.log("=> Connecting & caching database instance");
    const client = await connectToDatabase();
    cachedDb = client.db(process.env.DB_NAME);
  }
  return cachedDb;
}
