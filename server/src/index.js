// require("dotenv").config({ path: "./.env" })
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import path from "path"

// Determine the environment (default to development)
const environmentName = process.env.NODE_ENV || "development"

// Set the path to the .env file
const envFileName = `.env.${environmentName}`
const envFilePath = path.resolve(process.cwd(), "src", "config", envFileName)

if (environmentName !== "production") {
  dotenv.config({
    path: envFilePath,
  })
}

connectDB()

// import express from "express"

// const app = express()

// ;(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error", (err) => {
//       console.error("MongoDB connection error:", err)
//       throw err
//     })
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`)
//     })
//   } catch (err) {
//     console.error("ERROR: " + err)
//     throw err
//   }
// })()
