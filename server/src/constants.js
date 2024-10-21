export const DB_NAME = "taskflow";
export const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV !== "production") {
      // Allow all domains in development
      callback(null, true);
    } else {
    // Restrict origins in production
        const whitelist = [];
        // Experiment by removing !origin
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Limit to necessary methods
  allowedHeaders: ["Content-Type", "Authorization"], // Restrict to necessary headers
  credentials: true, // Allow credentials like cookies in both environments
  optionSuccessStatus: 204, // Ensures browsers don't choke on preflight responses
};
