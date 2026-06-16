const mongoose = require("mongoose");

const SubjectShortCodeSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  subjects: [
    {
      name: String,        // Full subject name (for reference)
      code: String,        // Subject code (09101)
      short: String        // Short form (BMS, BSC, ENG, ICT, etc.)
    }
  ]
});

module.exports = mongoose.model(
  "SubjectShortCode",
  SubjectShortCodeSchema
);
