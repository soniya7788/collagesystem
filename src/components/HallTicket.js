import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import "./HallTicket.css";

function HallTicket() {
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
  
  const { id } = useParams(); // examFormId

  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const student = JSON.parse(localStorage.getItem("student"));


  useEffect(() => {
    if (!student || !id) return;

    axios
      .get(`https://collagesystem-backend.onrender.com/api/exam/hall-ticket-by-form/${id}`)
      .then(res => setTicket(res.data))
      .catch(() =>
        setError("Hall Ticket not available. Please wait for approval.")
      );
  }, [student, id]);

  if (error) {
    return (
      <Layout>
        <h3>{error}</h3>
      </Layout>
    );
  }

  if (!ticket) return null;

  const exam = ticket.exam;

  /* ===== SUBJECT LINE FORMAT (MSBTE STYLE) ===== */
  const subjectLine = (sub) => {
    let parts = [];

    // THEORY
    if (sub.SA_TH || sub.FA_TH) {
      let th = [];
      if (sub.SA_TH) th.push("SA");
      if (sub.FA_TH) th.push("FA");
      parts.push(`TH. ${th.join("  ")}`);
    }

    // PRACTICAL
    if (sub.SA_PR || sub.FA_PR) {
      let pr = [];
      if (sub.SA_PR) pr.push("SA");
      if (sub.FA_PR) pr.push("FA");
      parts.push(`PR. ${pr.join("  ")}`);
    }

    // SLA
    if (sub.SLA) {
      parts.push("SLA");
    }

    return `${sub.name} ${parts.join("  ")}`;
  };
const scheme = `${schemePrefix[exam.department]}-${exam.semester}.A`;
  return (
    
    <Layout>
      <div className="hallticket-container">

        {/* ================= HEADER ================= */}
        <div className="ht-header">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnISktbHBxvEoWZusMqkQrWKxBE9Nxd8z8wQ&s"
            alt="GTMC"
          />
          <div className="ht-header-text">
            <h2>Gramin Technical & Management Campus</h2>
            <h4>Autonomous Diploma College, Nanded</h4>
            <h3>
              Hall Ticket for {exam.examSeason} {exam.examYear} Examination
            </h3>
          </div>
        </div>

        {/* ================= MAIN TABLE ================= */}
        <table className="ht-main-table">
          <tbody>

            <tr>
              <td><b>Enrollment / PRN</b></td>
              <td>{student.prn}</td>
              <td rowSpan="4" style={{ textAlign: "center" }}>
                <div className="photo-box">
                  <img
                    src={`https://collagesystem-backend.onrender.com/uploads/${student.photo}`}
                    alt="Student"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td><b>Candidate Full Name</b></td>
              <td>{student.name.toUpperCase()}</td>
            </tr>

            <tr className="red-text">
              <td><b>Exam Center Code & Name</b></td>
              <td>0069 – GRAMIN TECHNICAL & MANAGEMENT CAMPUS, NANDED</td>
            </tr>

            <tr>
              <td><b>Course / Year / Scheme</b></td>
              <td>
               
               {scheme}

              </td>
            </tr>

            {/* ================= SUBJECTS ================= */}
            <tr>
              <td><b>Subject Appearing For</b></td>
              <td colSpan="2">
                <div className="subject-box">
                  {exam.subjects.map((sub, i) => (
                    <span key={i}>
                      {subjectLine(sub)}
                      {i !== exam.subjects.length - 1 &&  ", "}
                    </span>
                  ))}
                </div>
              </td>
            </tr>

            {/* ================= INSTRUCTIONS ================= */}
            <tr>
              <td colSpan="3">
                <div className="instruction-box">
                  <div className="instruction-title">
                    Instructions for Examinee
                  </div>
                  <ol>
                    <li>This Hall Ticket is not the blanket permission to appear for the Examination.</li>
                    <li>Candidate must be present at the Center 10 minutes before commencement.</li>
                    <li>No candidate shall be admitted after 30 minutes.</li>
                    <li>Mobile phones, smart watches are strictly prohibited.</li>
                    <li>Candidate must carry valid photo identity.</li>
                    <li>Candidate must preserve hall ticket till completion of examination.</li>
                    <li>Candidate must sign in presence of Supervisor.</li>
                    <li>Use of unfair means will lead to cancellation.</li>
                    <li>Candidate must follow seating arrangement strictly.</li>
                    <li>Institute decision shall be final.</li>
                  </ol>
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="3">
                <div className="instruction-box">
                  <div className="instruction-title">
                    Instructions for Examination Centres
                  </div>
                  <ol>
                    <li>Examination centre should verify identity of candidates.</li>
                    <li>Candidate shall be allowed to appear even if report not received.</li>
                  </ol>
                </div>
              </td>
            </tr>

            {/* ================= FOOTER ================= */}
            <tr className="footer-row">
  <td colSpan="3">
    <div className="footer-inner">
      
      <div className="footer-seal">
        <div className="seal-oval">Seal of Institute</div>
      </div>

      <div className="footer-attested">
        <b>Attested By</b>
        Principal / HOD<br />
        Sign and Stamp
      </div>

    </div>
  </td>
</tr>
            <tr>
              <td colSpan="3">
                Date: {new Date().toLocaleDateString()}
              </td>
            </tr>

          </tbody>
        </table>
      
      <br />
        <button className="print-btn" onClick={() => window.print()}>
          
          Print / Download Hall Ticket
        </button>
      </div>
    </Layout>
  );
}

export default HallTicket;
