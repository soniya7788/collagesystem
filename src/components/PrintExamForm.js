import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function PrintExamForm() {
  const [examForms, setExamForms] = useState([]);
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (!student) return;

    axios
      .get(`http://localhost:5000/api/exam/my-exam-forms/${student._id}`)
      .then(res => setExamForms(res.data))
      .catch(err => console.error(err));
  }, [student]);

  
  return (
    <Layout>
      <h2>Print Exam Form</h2>
       <br />
      {examForms.length === 0 ? (
        <p>No exam forms submitted yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Exam</th>
              <th>Payment</th>
              <th>Action</th>
              <th>Approval</th>

            </tr>
          </thead>

          <tbody>
            {examForms.map((f, index) => (
              <tr key={f._id}>
                <td>{index + 1}</td>
                <td>{f.department}</td>
                <td>Sem {f.semester}</td>
                <td>{f.examSeason} {f.examYear}</td>

                <td>
                  {f.paymentVerified ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      PAID
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      NOT PAID
                    </span>
                  )}
                </td>

                <td>
  {f.formApproved ? (
    <span style={{ color: "green", fontWeight: "bold" }}>
      Approved
    </span>
  ) : f.allowEdit ? (
    <button
      onClick={() => navigate(`/exam-form/${f._id}`)}
      style={{ backgroundColor: "#ff9800", color: "white" }}
    >
      Edit
    </button>
  ) : f.editedAfterAllow ? (
    <span style={{ color: "green", fontWeight: "bold" }}>
      Edited – Under Review
    </span>
  ) : (
    <span style={{ color: "orange" }}>
      Under Review
    </span>
  )}
</td>           

                <td>
  {/* Print Exam Form */}
  <button
    className="btn view"
    onClick={() => navigate(`/print-exam-form/${f._id}`)}
  >
    Print Exam Form
  </button>
 
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default PrintExamForm;
