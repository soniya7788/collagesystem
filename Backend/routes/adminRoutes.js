const express = require("express");
const Student = require("../models/Student");
const generatePassword = require("../utils/generatePassword");
const sendPasswordMail = require("../utils/sendPasswordMail");
const router = express.Router();

/* GET STUDENTS */
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    console.log("Students fetched:", students.length);
    res.json(students);
  } catch (err) {
    console.error("GET students error:", err);
    res.status(500).json({ message: "Fetch students failed" });
  }
});


router.put("/exam-form/payment/:id", async (req, res) => {
  await ExamForm.findByIdAndUpdate(req.params.id, {
    paymentStatus: "Success"
  });
  res.json({ message: "Payment marked as done" });
});

router.put("/exam-form/approve/:id", async (req, res) => {
  await ExamForm.findByIdAndUpdate(req.params.id, {
    approved: true
  });
  res.json({ message: "Exam form approved" });
});

/* APPROVE STUDENT */
router.put("/approve/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Generate password only once
    if (!student.password) {
      student.password = Math.random().toString(36).slice(-8);
    }

    student.approved = true;
    await student.save();

    // Send email
    await sendPasswordMail(student, student.password);

    res.json({ message: "Student approved and password sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Approval failed" });
  }
});

// ADMIN DELETE STUDENTS
router.delete("/delete-students", async (req, res) => {
  try {
    const { ids } = req.body;

    await Student.deleteMany({ _id: { $in: ids } });

    res.json({ message: "Students deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
