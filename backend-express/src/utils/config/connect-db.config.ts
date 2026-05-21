import mongoose from "mongoose";
import { env } from "../load-env";

export const connectDB = async () => {
    const { MONGO_URI } = env
    try {
        await mongoose.connect(MONGO_URI, { family: 4 });
        console.log("🟩 MongoDB Connected");
    } catch (error) {
        console.error("🟥 DB connection error:", error);
        process.exit(1);
    }
};
