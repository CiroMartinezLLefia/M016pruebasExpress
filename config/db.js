import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI no está definida en .env");
        return;
    }
    try {
        await connect(uri, { serverSelectionTimeoutMS: 10000 });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}