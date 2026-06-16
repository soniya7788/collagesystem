const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
});

/**
 * sendPasswordMail supports BOTH:
 * 1) sendPasswordMail(studentObject, password)
 * 2) sendPasswordMail(email, password, name)
 */
module.exports = async function sendPasswordMail(arg1, password, name = "Student") {
  let toEmail;
  let studentName = name;
  let prn = "";

  // ✅ CASE 1: student object passed
  if (typeof arg1 === "object" && arg1 !== null) {
    toEmail = arg1.email;
    studentName = arg1.name;
    prn = arg1.prn || "";
  }

  // ✅ CASE 2: email string passed
  if (typeof arg1 === "string") {
    toEmail = arg1;
  }

  if (!toEmail) {
    throw new Error("Recipient email missing");
  }

  const mailOptions = {
    from: `"Gramin Technical and Management Campus Exam Portal" <soniyaryadav@gmail.com>`,
    to: toEmail,
    subject: "Exam Portal Login Password",
    html: `
      <h2>Gramin Technical and Management Campus, Nanded</h2>
      <p>Dear <b>${studentName}</b>,</p>

      <p>Your exam portal password is:</p>

      <h3 style="color:#1f4e79">${password}</h3>

      ${prn ? `<p><b>Enrollment (PRN):</b> ${prn}</p>` : ""}

      <p>Please login and change your password immediately.</p>

      <p><b>Note:</b> Do not share your password with anyone.</p>

      <br/>
      <p>Regards,<br/>
      <b>Gramin Technical and Management Campus, Examination Cell</b></p>
    `
  };

  await transporter.sendMail(mailOptions);
};
