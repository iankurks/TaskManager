const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./db.js");
const apiRoutes = require("./api.js");
const authRoutes = require("./auth.js")
dotenv.config();


const app = express();
// ✅ CORS — MUST be before routes
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

connectDB();
// Routes
app.use("/api", apiRoutes);
// Routes
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
