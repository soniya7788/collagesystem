// @ts-nocheck
const express = require("express");
const mongoose = require("mongoose");
const ExamForm = require("../models/ExamForm");
const Subject = require("../models/Subject");
const HallTicket = require("../models/HallTicket");
const router = express.Router();
const PDFDocument = require("pdfkit");
const SubjectShortCode = require("../models/SubjectShortCode");
const buildSubjectShortForms = require("../utils/buildSubjectShortForms");

const schemePrefix = {
  "Computer Engineering": "CO",
  "Information Technology": "IF",
  "Electrical Engineering": "EE",
  "Electronics and Telecommunication Engineering": "EJ",
  "Civil Engineering": "CE",
  "Mechanical Engineering": "ME",
  "Hotel Management and Catering Technology": "HM",
  "Medical Laboratory Technology": "ML"
};

router.get("/subject-shortcodes", async (req, res) => {

  try {

    const { department, semester } = req.query;

    const doc = await SubjectShortCode.findOne({
      department,
      semester
    });

    if (!doc) {
      return res.json([]);
    }

    res.json(doc.subjects);

  } catch (err) {

    res.status(500).json({
      message: "Failed"
    });

  }

});

// ================= ADMIN: GET EXAM FORMS =================
router.get("/admin/forms", async (req, res) => {
  try {
    const {
      department,
      semester,
      examYear,
      examSeason,
      payment,
      approved
    } = req.query;

    const filter = {};
    if (department) filter.department = department;
    if (semester) filter.semester = Number(semester);
    if (examYear) filter.examYear = examYear;
    if (examSeason) filter.examSeason = examSeason;
    if (payment) filter.paymentVerified = payment === "true";
    if (approved) filter.formApproved = approved === "true";

    const forms = await ExamForm
      .find(filter)
      .populate("studentId")
      .sort({ createdAt: -1 });

    res.json(forms);
  } catch (err) {
    console.error("ADMIN FORMS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch exam forms" });
  }
});

      
router.get("/admin/seating-chart-data", async (req, res) => {
  try {
    const {
      examType,
      department,
      semester,
      examSeason,
      examYear
    } = req.query;

    let query = { formApproved: true };

    if (examType) query.examType = examType;
    if (department) query.department = department;
    if (semester) query.semester = Number(semester);
    if (examSeason) query.examSeason = examSeason;
    if (examYear) query.examYear = Number(examYear);

    const forms = await ExamForm.find(query).populate("studentId");

    const rows = [];

   for (let i = 0; i < forms.length; i++) {
  const f = forms[i];
  const examTypeLabelMap = {
  Regular: "Regular",
  Backlog: "Supplementary",
  Remedial: `${f.examSeason} Remedial`
};

  const scheme = `${schemePrefix[f.department]}-${f.semester}.A`;

 const subjectShortForms = await buildSubjectShortForms(
  f.subjects,
  f.department,
  f.semester
);

  rows.push({
  id: f._id,
  sr: i + 1,
    enrollment: f.prn,
    candidateName: f.studentId?.name || "",
    scheme,
    subjects: subjectShortForms.join(", "),
    status: examTypeLabelMap[f.examType] || f.examType,
    appear: "Y",
    examSeason: f.examSeason,
    examYear: f.examYear
  });
}

    res.json(rows);
  } catch (err) {
    console.error("SEATING CHART ERROR:", err);
    res.status(500).json({ message: "Failed to load seating chart" });
  }
});

// ADMIN: PAYMENT DONE
router.put("/admin/payment/:id", async (req, res) => {
  await ExamForm.findByIdAndUpdate(req.params.id, {
    paymentVerified: true
  });
  res.json({ message: "Payment marked as done" });
});


/* ================= GET DEPARTMENTS ================= */
router.get("/departments", async (req, res) => {
  const depts = await Subject.distinct("department");
  res.json(depts);
});

/* ================= GET Hallticket ================= */
router.get("/hall-ticket/:studentId", async (req, res) => {
  try {
    const examForm = await ExamForm
      .findOne({
        studentId: req.params.studentId,
        formApproved: true
      })
      .sort({ createdAt: -1 })
      .populate("studentId");

    if (!examForm) {
      return res.status(404).json({ message: "Hall ticket not available" });
    }

    // ✅ USE SUBJECTS AS-IS (VERY IMPORTANT)
    // ==== FILTER SUBJECTS FOR BACKLOG & REMEDIAL ====
let filteredSubjects = examForm.subjects;

if (examForm.examType !== "Regular") {
  filteredSubjects = examForm.subjects.filter(s =>
  s.SA_TH || s.SA_PR || s.SLA
);
}

// ==== DEPARTMENT → SCHEME PREFIX ====
const schemePrefix = {
  "Computer Engineering": "CO",
  "Information Technology": "IF",
  "Electrical Engineering": "EE",
  "Electronics and Telecommunication Engineering": "EJ",
  "Mechanical Engineering": "ME",
  "Civil Engineering": "CE",
  "Hotel Management and Catering Technology": "HM",
  "Medical Laboratory Technology": "ML"
};

// ==== FINAL RESPONSE ====
res.json({
  student: examForm.studentId,
  exam: {
    _id: examForm._id,
    department: examForm.department,
    semester: examForm.semester,
    scheme: `${schemePrefix[examForm.department]}-${examForm.semester}.A`,
    examSeason: examForm.examSeason,
    examYear: examForm.examYear,
    examType: examForm.examType,
    receiptNumber: examForm.receiptNumber,
    subjects: filteredSubjects     // ✔ NOW CORRECT
  }
});

  } catch (err) {
    console.error("Hall ticket error:", err);
    res.status(500).json({ message: "Failed to generate hall ticket" });
  }
});

// ✅ GET ALL APPROVED HALL TICKETS FOR STUDENT
router.get("/hall-tickets/:studentId", async (req, res) => {
  try {
    const forms = await ExamForm
      .find({
        studentId: req.params.studentId,
        formApproved: true
      })
      .sort({ createdAt: -1 });

    res.json(forms);
  } catch (err) {
    console.error("Hall ticket list error:", err);
    res.status(500).json({ message: "Failed to fetch hall tickets" });
  }
});

router.get("/hall-ticket-by-form/:id", async (req, res) => {
  try {
    const examForm = await ExamForm
      .findById(req.params.id)
      .populate("studentId");

    if (!examForm || !examForm.formApproved) {
      return res.status(404).json({ message: "Hall ticket not available" });
    }

    let filteredSubjects = examForm.subjects;

// 🔥 Keep only selected subjects for Backlog / Remedial
if (examForm.examType !== "Regular") {
  filteredSubjects = examForm.subjects.filter(s =>
    s.SA_TH || s.SA_PR || s.SLA
  );
}

res.json({
  student: examForm.studentId,
  exam: {
    _id: examForm._id,
    department: examForm.department,
    semester: examForm.semester,
    scheme: `${schemePrefix[examForm.department]}-${examForm.semester}.A`,
    examSeason: examForm.examSeason,
    examYear: examForm.examYear,
    examType: examForm.examType,
    receiptNumber: examForm.receiptNumber,
    subjects: filteredSubjects    // 👈 NOW CORRECT
  }
});

  } catch (err) {
    res.status(500).json({ message: "Failed to load hall ticket" });
  }
});


/* ================= GET SUBJECTS ================= */
router.get("/subjects", async (req, res) => {
  try {
    let { department, semester } = req.query;
    semester = Number(semester);

    console.log("➡️ Request:", department, semester);

    const doc = await Subject.findOne({
      department,
      semester
    });

    console.log("➡️ Found:", doc);

    if (!doc) {
      return res.status(404).json({ message: "Subjects not found!" });
    }

    res.json(doc.subjects);   // ← SEND ONLY ARRAY
  } catch (err) {
    console.error("❌ SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: APPROVE FORM
router.put("/admin/approve/:id", async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (!form.paymentVerified) {
      return res.status(400).json({ message: "Payment not verified" });
    }

    form.formApproved = true;
    await form.save();

    // ✅ CREATE HALL TICKET (ONLY ONCE)
    const exists = await HallTicket.findOne({ examFormId: form._id });

    if (!exists) {
      await HallTicket.create({
        studentId: form.studentId,
        examFormId: form._id,
        department: form.department,
        semester: form.semester,
        examSeason: form.examSeason,
        examYear: form.examYear,
        examType: form.examType,
        subjects: form.subjects.map(s => ({
  name: s.name,

  FA_TH: !!s.FA_TH,
  SA_TH: !!s.SA_TH,

  FA_PR: !!s.FA_PR,
  SA_PR: !!s.SA_PR,

  SLA: !!s.SLA
}))

      });
    }

    res.json({ message: "Exam form approved & hall ticket generated" });

  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});


/* ================= SUBMIT EXAM FORM ================= */
router.post("/submit", async (req, res) => {
  try {
    const {
      studentId,
      prn,
      department,
      semester,
      examSeason,
      examYear,
      examType,
      subjects
    } = req.body;

    // ✅ MAP SUBJECTS EXPLICITLY (VERY IMPORTANT)
    const mappedSubjects = subjects.map(s => ({
      name: s.name,

      FA_TH: s.FA_TH,
      SA_TH: s.SA_TH,

      FA_PR: s.FA_PR,
      SA_PR: s.SA_PR,

      SLA: s.SLA
    }));

    const receiptNumber =
      "GTMC-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(100000 + Math.random() * 900000);

    const examForm = new ExamForm({
      studentId,
      prn,
      department,
      semester,
      examSeason,
      examYear,
      examType,
      subjects: mappedSubjects,   // ✅ USE MAPPED SUBJECTS
      receiptNumber,
      paymentVerified: false,
      formApproved: false
    });

    await examForm.save();

    res.json({ message: "Exam form submitted successfully" });
  } catch (err) {
    console.error("❌ EXAM FORM SUBMIT ERROR:", err);
    res.status(500).json({
      message: "Server error while submitting exam form"
    });
  }
});

/* ================= GET MY EXAM FORMS ================= */

/* ================= GET MY EXAM FORMS ================= */
router.get("/my-exam-forms/:studentId", async (req, res) => {
  try {
    const forms = await ExamForm
      .find({ studentId: req.params.studentId })   // ✅ FILTER
      .sort({ createdAt: -1 })
      .populate("studentId");

    res.json(forms); // ✅ SEND RESPONSE
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch exam forms" });
  }
});


router.get("/exam-form/:id", async (req, res) => {
  const form = await ExamForm
    .findById(req.params.id)
    .populate("studentId");

  if (!form) {
    return res.status(404).json({ message: "Form not found" });
  }

  res.json(form);
});

router.put("/mark-paid/:id", async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    form.paymentVerified = true;
    await form.save();

    res.json({ message: "Payment marked as done" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update payment" });
  }
});

// ADMIN: ALLOW EDIT
// ================= ADMIN: ALLOW EDIT =================
router.put("/admin/allow-edit/:id", async (req, res) => {
  const form = await ExamForm.findById(req.params.id);
  if (!form) return res.status(404).json({ message: "Form not found" });

  form.allowEdit = true;
  form.formApproved = false;

  await form.save();
  res.json({ message: "Edit allowed" });
});


router.put("/approve/:id", async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    if (!form.paymentVerified) {
      return res.status(400).json({
        message: "Payment not verified"
      });
    }

    form.formApproved = true;
    await form.save();

    res.json({ message: "Exam form approved" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});


// STUDENT: RESUBMIT EDITED EXAM FORM
router.put("/resubmit/:id", async (req, res) => {
  try {
    const {
      department,
      semester,
      examSeason,
      examYear,
      examType,
      subjects
    } = req.body;

    const form = await ExamForm.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Exam form not found" });
    }

    // update form details
    form.department = department;
    form.semester = semester;
    form.examSeason = examSeason;
    form.examYear = examYear;
    form.examType = examType;

    // update subjects
    form.subjects = subjects.map(s => ({
      name: s.name,
      FA_TH: s.FA_TH,
      SA_TH: s.SA_TH,
      FA_PR: s.FA_PR,
      SA_PR: s.SA_PR,
      SLA: s.SLA
    }));

    // reset states
    form.allowEdit = false;
    form.formApproved = false;
    form.editedAfterAllow = true;

    await form.save();

    res.json({ message: "Exam form updated successfully" });

  } catch (err) {
    console.error("RESUBMIT ERROR:", err);
    res.status(500).json({ message: "Resubmission failed" });
  }
});

// ADMIN DELETE EXAM FORMS
router.delete("/admin/delete-forms", async (req, res) => {
  try {
    const { ids } = req.body;

    await ExamForm.deleteMany({ _id: { $in: ids } });

    res.json({ message: "Forms deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.post("/admin/add-subjects", async (req, res) => {

  try {

    const {
      department,
      semester,
      subjects
    } = req.body;

    // SUBJECT COLLECTION

    const formattedSubjects = subjects.map(s => ({

      name: s.name,

      TH: s.TH,
      PR: s.PR,

      FA_TH: s.FA_TH,
      SA_TH: s.SA_TH,

      FA_PR: s.FA_PR,
      SA_PR: s.SA_PR,

      SLA: s.SLA

    }));

    await Subject.findOneAndUpdate(

      {
        department,
        semester
      },

      {
        department,
        semester,
        subjects: formattedSubjects
      },

      {
        upsert: true
      }

    );

    // SHORT CODE COLLECTION

    const shortSubjects = subjects.map(s => ({

      name: s.name,

      code: s.code,

      short: s.short

    }));

    await SubjectShortCode.findOneAndUpdate(

      {
        department,
        semester
      },

      {
        department,
        semester,
        subjects: shortSubjects
      },

      {
        upsert: true
      }

    );

    res.json({
      message: "Subjects saved"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Save failed"
    });

  }

});

module.exports = router;
