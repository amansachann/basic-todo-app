// require("dotenv").config({ path: "./.env" })
import dotenv from "dotenv"
import logger from "./utils/logger.js"
import connectDB from "./db/index.js"
import path from "path"
import app from "./app.js"
import winston from 'winston'

// Determine the environment (default to development)
const environmentName = process.env.NODE_ENV || "development"

// Load environment variabes based on the evironment (only for non-production)
const envFileName = `.env.${environmentName}`
const envFilePath = path.resolve(process.cwd(), "src", "config", envFileName)

if (environmentName !== "production") {
  dotenv.config({
    path: envFilePath,
  })

  //
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Start the server
const startServer = () => {
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`)
  })
}

// Initalize Application
const initailizeApp = async () => {
  await connectDB()   // Connect the DB
  startServer()     // Start the server
}

initailizeApp()
