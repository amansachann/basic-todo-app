import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./constants.js";

const app = express();

// CORS: Enable Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// Body Parser: Parse incoming requests with JSON payloads
// default limit -- 100kb
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
// https://expressjs.com/en/api.html
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser())

// Logging Middleware: Use morgan to log HTTP requests
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // Detailed logging for development
} else {
  app.use(morgan("combined")); // Less verbose logging for production
}

export default app;
