const express = require("express");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const router = express.Router();
const generatePassword = require("../utils/generatePassword");
const sendPasswordMail = require("../utils/sendPasswordMail");

/* ADMIN LOGIN */
router.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(401).json({ message: "Invalid admin credentials" });
  res.json({ admin });
});

router.post("/send-password", async (req, res) => {
  const { prn } = req.body;

  const student = await Student.findOne({ prn });

  if (!student)
    return res.json({ status: "not_found" });

  if (!student.approved)
    return res.json({ status: "not_approved" });

  const sendPasswordMail = require("../utils/sendPasswordMail");

 await sendPasswordMail(
  student.email,
  student.password,
  student.name
);

  res.json({ status: "sent" });
});

router.post("/change-password", async (req, res) => {
  try {
    const { prn, oldPassword, newPassword } = req.body;

    const student = await Student.findOne({ prn });
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    // 🔒 limit check
    if (student.changePasswordCount >= 2) {
      return res.status(403).json({
        message: "Change password limit exceeded"
      });
    }

    // 🔐 verify old password
    if (student.password !== oldPassword) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    // ✅ update password
    student.password = newPassword;
    student.changePasswordCount += 1;
    await student.save();

    res.json({
      message: "Password changed successfully"
    });

  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/student-forgot", async (req, res) => {
  const { prn, email } = req.body;

  const student = await Student.findOne({ prn, email });
  if (!student) return res.json({ status: "not_found" });

  if (student.forgotPasswordCount >= 2)
    return res.json({ status: "used" });

  try {
    // ✅ SEND EXISTING PASSWORD
    await sendPasswordMail(student, student.password);

    student.forgotPasswordCount += 1;
    await student.save();

    return res.json({ status: "sent" });
  } catch (err) {
    console.log("MAIL FAILED:", err);
    return res.json({ status: "email_error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { prn, newPassword } = req.body;

  const student = await Student.findOne({ prn });

  if (!student)
    return res.json({ status: "not_found" });

  student.password = newPassword;
  student.otp = null;
  student.otpExpiry = null;

  await student.save();

  res.json({ status: "success" });
});


/* STUDENT LOGIN */
router.post("/student-login", async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email, approved: true });

  if (!student || student.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ student });   // ✅ FULL OBJECT
});

module.exports = router;
