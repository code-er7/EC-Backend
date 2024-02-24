import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

export default connectDB;
