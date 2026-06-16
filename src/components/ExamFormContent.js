function ExamFormContent({ form, isAdmin }) {
  const student = form.studentId;
  //const [showPrint, setShowPrint] = useState(false);

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

const scheme = `${schemePrefix[form.department]}-${form.semester}.A`;

const examTypeLabelMap = {
  Regular: "Regular",
  Backlog: "Supplementary",
  Remedial: `${form.examSeason} Remedial`
};

const examTypeLabel =
  examTypeLabelMap[form.examType] || form.examType;

  return (
    <div className="print-page">

      {/* HEADER */}
      <div className="print-header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnISktbHBxvEoWZusMqkQrWKxBE9Nxd8z8wQ&s"
          className="college-logo"
          alt="GTMC Logo"
        />
        <div className="header-text">
          <h2>Gramin Technical and Management Campus, Nanded</h2>
          <p>(Autonomous Institute)</p>
          <h3>
            Online Examination Form Application Receipt for{" "}
            {form.examSeason} {form.examYear} Exam
          </h3>
        </div>
      </div>

      {/* CANDIDATE INFO */}
      <div className="candidate-box">
        <table>
          <tbody>
            <tr><td>Candidate Full Name</td><td>{student.name}</td></tr>
            <tr><td>PRN</td><td>{student.prn}</td></tr>
            <tr>
              <td>Course / Year / Scheme</td>
              <td>{scheme}</td>
            </tr>
            <tr><td>Gender</td><td>{student.gender}</td></tr>
            <tr><td>Date of Birth</td><td>{student.dob}</td></tr>
            <tr><td>Course Name</td><td>Diploma in {form.department}</td></tr>
            <tr><td>Exam Type</td><td>{examTypeLabel}</td></tr>

          </tbody>
        </table>

        <div className="photo-box">
          <img src={`http://localhost:5000/uploads/${student.photo}`} alt="student" />
        </div>
      </div>

      {/* SUBJECT TABLE */}
      <table className="subject-table">
        <thead>
  <tr>
    <th rowSpan="2">Sr</th>
    <th rowSpan="2">Subject Name</th>
    <th colSpan="2">Theory</th>
    <th colSpan="2">Practical</th>
    <th rowSpan="2">SLA</th>
  </tr>
  <tr>
    <th>FA</th><th>SA</th>
    <th>FA</th><th>SA</th>
  </tr>
</thead>

        <tbody>
          {form.subjects.map((s, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.FA_TH ? "✔" : "-"}</td>
              <td>{s.SA_TH ? "✔" : "-"}</td>
              <td>{s.FA_PR ? "✔" : "-"}</td>
              <td>{s.SA_PR ? "✔" : "-"}</td>
              <td>{s.SLA ? "✔" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FOOTER */}
      <div className="print-footer">
        <div>Date: {new Date().toLocaleDateString()}</div>
        <div className="sign">
          Signature of Candidate
          <div className="sign-line"></div>
        </div>
      </div>
    </div>
  );
}

export default ExamFormContent;
