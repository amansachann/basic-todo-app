import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import logger from "../utils/logger.js";

// Database is always in another continent

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    logger.info("Database Connection Successful");
    // console.log(`-----> HOST: ${connectionInstance.connection.host}`);
    // console.log(`-----> PORT: ${connectionInstance.connection.port}`);
  } catch (err) {
    logger.error("MONGODB CONNECTION FAILED!!", err);
    process.exit(1); // Exit with failure if DB connection fails
  }
};

export default connectDB;
