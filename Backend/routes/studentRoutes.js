const express = require("express");
const Student = require("../models/Student");
const multer = require("multer");
const path = require("path");

const router = express.Router();

/* ===== MULTER CONFIG FIRST ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* ===== STUDENT SIGNUP ===== */
router.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    const {
      prn,
      name,
      email,
      mobile,
      dob,
      gender,
      department,
      year,
      semester
    } = req.body;

    const student = new Student({
      prn,
      name,
      email,
      mobile,
      dob,
      gender,
      department,
      year,
      semester,
      photo: req.file ? req.file.filename : "",
      approved: false
    });

    await student.save();
    res.json({ message: "Signup successful. Wait for admin approval." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

module.exports = router;
