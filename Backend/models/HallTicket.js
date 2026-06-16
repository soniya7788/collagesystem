const mongoose = require("mongoose");

const HallTicketSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  examFormId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExamForm",
    required: true,
    unique: true
  },

  department: String,
  semester: Number,
  examSeason: String,
  examYear: Number,
  examType: String,

  subjects: [
    {
      name: String,

      FA_TH: Boolean,
      SA_TH: Boolean,

      FA_PR: Boolean,
      SA_PR: Boolean,

      // ✅ ADD THESE TWO LINES (THIS WAS MISSING)
      SLA: Boolean,
    }
  ],

  generatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("HallTicket", HallTicketSchema);
