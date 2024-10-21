import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

// Database is always in another continent

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    console.log("MongoDB connected!!")
    console.log(`HOST: ${connectionInstance.connection.host}`)
    console.log(`PORT: ${connectionInstance.connection.port}`)
  } catch (err) {
    console.error("MONGODB CONNECTION FAILED: ", err)
    process.exit(1)
  }
}

export default connectDB
