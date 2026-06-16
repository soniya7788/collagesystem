// @ts-nocheck
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const examRoutes = require("./routes/examRoutes");
const app = express();
const path = require("path");


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/exam", require("./routes/examRoutes")); // ✅ CORRECT
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

