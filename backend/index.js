require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const jobRoutes = require("./routes/jobRoute");
const applicationRoutes = require("./routes/applicationRoute");
const savedJobsRoutes = require("./routes/savedJobRoute");
const analyticsRoutes = require("./routes/analyticsRoute");

const app = express();

//Middleware to handle CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-new-lilac.vercel.app",
  "https://job-portal-oizrtkyz0-aditya2909s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Connect Database
connectDB();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/saved-jobs", savedJobsRoutes);
app.use("/api/analytics", analyticsRoutes);

//Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
