import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { useParams, useNavigate } from "react-router-dom";

function ExamForm() {
const { id } = useParams();   // 👈 formId if editing

const isEditMode = !!id; 

const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  const [examType, setExamType] = useState("Regular");
  const [department, setDepartment] = useState(student?.department || "");
  const [examSeason, setExamSeason] = useState("");
  const [examYear, setExamYear] = useState("");
  const [semester, setSemester] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

const [exemption, setExemption] = useState({
  maths:false,
  physics:false,
  chemistry:false,
  biology:false
});

const toggleExemption = (field) => {
  setExemption(prev => ({
    ...prev,
    [field]: !prev[field]
  }));
};

useEffect(() => {
  if (isEditMode) {
    setShowForm(false); // student must click Find Exams again
  }
}, [isEditMode]);

  /* ================= FIND EXAMS ================= */
  const findExams = async () => {
  if (!department || !examSeason || !examYear || !semester) {
    alert("Please select all fields");
    return;
  }

  try {
    const res = await axios.get(
      `https://collagesystem-backend.onrender.com/api/exam/subjects?department=${department}&semester=${semester}`
    );

    let subjectsList = res.data;
/* ================= EXEMPTION LOGIC ================= */

if (examType === "Regular") {

  // NON-DMLT → Semester 1
  if (department !== "Medical Laboratory Technology" && semester === "1") {

    if (exemption.maths) {
      subjectsList = subjectsList.filter(
        s => !s.name.includes("Basic Mathematics")
      );
    }

    if (exemption.physics || exemption.chemistry) {
      subjectsList = subjectsList.filter(
        s => !s.name.includes("Basic Science")
      );
    }

  }

  // DMLT → Semester 2
  if (department === "Medical Laboratory Technology" && semester === "2") {

    if (exemption.physics) {
      subjectsList = subjectsList.filter(
        s => !s.name.includes("(08202)")
      );
    }

    if (exemption.chemistry) {
      subjectsList = subjectsList.filter(
        s => !s.name.includes("(08201)")
      );
    }

    if (exemption.biology) {
      subjectsList = subjectsList.filter(
        s => !s.name.includes("(08203)")
      );
    }

  }

}

const prepared = subjectsList.map(sub => ({
  name: sub.name,
  code: sub.code,
  TH: sub.TH,
  PR: sub.PR,

  ...(examType === "Regular"
    ? {
        FA_TH: sub.FA_TH,
        SA_TH: sub.SA_TH,
        FA_PR: sub.FA_PR,
        SA_PR: sub.SA_PR,
        SLA: sub.SLA,

        // IMPORTANT!
        SA_TH_ALLOWED: sub.SA_TH,
        SA_PR_ALLOWED: sub.SA_PR
      }
    : {
        FA_TH: false,
        FA_PR: false,
        SLA: false,

        SA_TH: false,
        SA_PR: false,

        SA_TH_ALLOWED: sub.SA_TH,
        SA_PR_ALLOWED: sub.SA_PR
      })
}));

    setSubjects(prepared);
    setShowForm(true);
  } catch (err) {
    alert("Failed to load subjects");
    setShowForm(false);
  }
};

  /* ================= TOGGLE (BACKLOG ONLY) ================= */
  const toggle = (index, field, value) => {
    const copy = [...subjects];
    copy[index][field] = value;
    setSubjects(copy);
  };

  /* ================= SUBMIT FORM ================= */
  const submitForm = async () => {
  console.log("Submitting subjects:", subjects); // 🔴 ADD THIS

  try {
    await axios.post("https://collagesystem-backend.onrender.com/api/exam/submit", {
      studentId: student._id,
      prn: student.prn,
      department,
      semester,
      examSeason,
      examYear,
      examType,
      subjects
    });

    alert("Exam form submitted successfully");
  } catch (err) {
    alert("Submission failed");
  }
};

  return (
    <Layout>
      <div className="form-box">
        <h2>Exam Form</h2>

        {/* ===== INSTRUCTIONS (ALWAYS VISIBLE) ===== */}
        <div className="instructions-box">
          <h4>
            Important Instructions for Filling Candidate Exam Form
          </h4>
          <ul>
            <li>
              Check the compulsory subjects shown below as per semester and course.
            </li>
            <li>
              Click on Find Exams to load subject list.
            </li>
            <li>
              Click on Submit button to confirm exam form.
            </li>
          </ul>
        </div>

        {/* ===== FILTERS ===== */}
        <select value={examType} onChange={(e) => setExamType(e.target.value)}>
          <option value="">Select Exam Type</option>
  <option value="Regular">Regular</option>
  <option value="Backlog">Supplementary</option>
  <option value="Remedial">Summer Remedial</option>
</select>

        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          <option value={student.department}>{student.department}</option>
        </select>

<select onChange={(e) => setExamSeason(e.target.value)}>
          <option value="">Select Exam Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
        </select>

<select onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </select>

{examType === "Regular" &&
(
  (department !== "Medical Laboratory Technology" && semester === "1") ||
  (department === "Medical Laboratory Technology" && semester === "2")
) && (
  <div className="exemption-box">

    <p><b>If you scored more than 45 marks in 12th, select the subjects:</b></p>

    {department !== "Medical Laboratory Technology" && (
      <>
        <label>
          <input
            type="checkbox"
            checked={exemption.maths}
            onChange={() => toggleExemption("maths")}
          />
          Mathematics <br/>
        </label>

        <label>
          <input
            type="checkbox"
            checked={exemption.physics}
            onChange={() => toggleExemption("physics")}
          />
          Physics <br/>
        </label>

        <label>
          <input
            type="checkbox"
            checked={exemption.chemistry}
            onChange={() => toggleExemption("chemistry")}
          />
          Chemistry <br/>
        </label>
      </>
    )}

    {department === "Medical Laboratory Technology" && (
      <>
        <label>
          <input
            type="checkbox"
            checked={exemption.physics}
            onChange={() => toggleExemption("physics")}
          />
          Physics 
        </label> <br/>

        <label>
          <input
            type="checkbox"
            checked={exemption.chemistry}
            onChange={() => toggleExemption("chemistry")}
          />
          Chemistry
        </label> <br/>

        <label>
          <input
            type="checkbox"
            checked={exemption.biology}
            onChange={() => toggleExemption("biology")}
          />
          Biology
        </label> <br/>
      </>
    )}
<br/>
  </div>
)}

        <select onChange={(e) => setExamYear(e.target.value)}>
          <option value="">Select Exam Year</option>
          {Array.from({ length: 20 }, (_, i) => {
            const y = new Date().getFullYear() - 10 + i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>    

        {/* ===== FIND EXAMS BUTTON ===== */}
       <button
  onClick={findExams}
  className="btn-submit"
>
  Find Exams
</button>
        {/* ===== SUBJECT TABLE ===== */}
        {showForm && subjects.length > 0 && (
          <>
            <h3>Candidate Appearing Subject Details</h3>

            <table className="msbte-table">
  <thead>
  <tr>
    <th rowSpan="2">Sr</th>
    <th rowSpan="2">Subject Name</th>
    <th colSpan="2">Theory</th>
    <th colSpan="2">Practical</th>
    <th>SLA</th>

  </tr>
 <tr>
  <th>FA</th>
  <th>SA</th>
  <th>FA</th>
  <th>SA</th>
  <th></th>
  </tr>
</thead>

 <tbody>
                {subjects.map((sub, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{sub.name}</td>

                   {/* TH FA */}
{/* TH FA */}
<td className="center">
  {sub.TH && sub.FA_TH
    ? <input type="checkbox" checked disabled />
    : "-" }
</td>

{/* TH SA */}
<td className="center">
  {sub.TH && sub.SA_TH_ALLOWED
    ? examType === "Regular"
      ? <input type="checkbox" checked disabled />
      : <input
          type="checkbox"
          checked={sub.SA_TH}
          onChange={(e) => toggle(i, "SA_TH", e.target.checked)}
        />
    : "-" }
</td>

{/* PR FA */}
<td className="center">
  {sub.PR && sub.FA_PR
    ? <input type="checkbox" checked disabled />
    : "-" }
</td>

{/* PR SA */}
<td className="center">
  {sub.PR && sub.SA_PR_ALLOWED
    ? examType === "Regular"
      ? <input type="checkbox" checked disabled />
      : <input
          type="checkbox"
          checked={sub.SA_PR}
          onChange={(e) => toggle(i, "SA_PR", e.target.checked)}
        />
    : "-" }
</td>

{/* SLA */}
<td className="center">
  {examType === "Regular" && sub.SLA
    ? <input type="checkbox" checked disabled />
    : "-" }
</td>
                  </tr>
                ))}
              </tbody>
            </table>

           {/* ================= BUTTON ================= */}
{/* ================= FINAL ACTION BUTTON ================= */}

{!isEditMode && (
  <button
    type="button"
    className="btn-submit"
    onClick={submitForm}
  >
    Submit Exam Form
  </button>
)}

{isEditMode && (
  <button
    type="button"
    className="btn-submit"
    onClick={async () => {
      await axios.put(
  `https://collagesystem-backend.onrender.com/api/exam/resubmit/${id}`,
  {
    department,
    semester,
    examSeason,
    examYear,
    examType,
    subjects
  }
);
      alert("Exam form re-submitted successfully");
      navigate("/exam-form");
    }}
  >
    Re-Submit Exam Form
  </button>
)}

          </>
        )}
      </div>
    </Layout>
  );
}

export default ExamForm;
