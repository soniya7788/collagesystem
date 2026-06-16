const mongoose = require("mongoose");

const ExamFormSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

allowEdit: {
  type: Boolean,
  default: false
},
editedAfterAllow: {
  type: Boolean,
  default: false
},

  prn: String,
  department: String,
  examSeason: String,
  semester: Number,
  examYear: Number,
  examType: String,

  receiptNumber: {
    type: String,
    unique: true   // ✅ correct
  },

  subjects: [
  {
    name: String,

    FA_TH: Boolean,
    SA_TH: Boolean,

    FA_PR: Boolean,
    SA_PR: Boolean,

    // ✅ SLA MUST BE HERE
    SLA: Boolean,
  }
],


  paymentVerified: {
    type: Boolean,
    default: false
  },

  formApproved: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ExamForm", ExamFormSchema);
