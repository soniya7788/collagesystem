// models/Subject.js
const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  department: String,
  semester: Number,
  subjects: [
    {
      name: String,
      TH: Boolean,
      PR: Boolean,
      FA_TH: Boolean,
      SA_TH: Boolean,
      FA_PR: Boolean,
      SA_PR: Boolean,
      SLA: Boolean
    }
  ]
});

module.exports = mongoose.model("Subject", SubjectSchema);
