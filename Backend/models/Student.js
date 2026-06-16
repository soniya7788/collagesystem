const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  prn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },

  firstLogin: { type: Boolean, default: true },
forgotUsed: { type: Boolean, default: false },

changePasswordCount: {
  type: Number,
  default: 0
},
forgotPasswordCount: {
  type: Number,
  default: 0
},

  otp: String,
otpExpiry: Date,

  dob: String,
  gender: String,

  department: { type: String, required: true },
  year: { type: String, required: true },      // First / Second / Third
  semester: { type: Number, required: true },

  photo: String,

  password: String,
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Student", StudentSchema);
