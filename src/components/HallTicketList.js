import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function HallTicketList() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (!student) return;

    axios
      .get(`http://localhost:5000/api/exam/my-exam-forms/${student._id}`)
      .then(res => {
        // ✅ ONLY APPROVED FORMS CAN HAVE HALL TICKET
        const approvedForms = res.data.filter(f => f.formApproved);
        setForms(approvedForms);
      })
      .catch(err => console.error(err));
  }, [student]);

  return (
    <Layout>
      <h2>Hall Tickets</h2>

      {forms.length === 0 ? (
        <p>No hall ticket available yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Exam</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {forms.map((f, i) => (
              <tr key={f._id}>
                <td>{i + 1}</td>
                <td>{f.department}</td>
                <td>Sem {f.semester}</td>
                <td>{f.examSeason} {f.examYear}</td>
                <td>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Approved
                  </span>
                </td>
                <td>
                  <button
                    className="btn view"
                    onClick={() => navigate(`/hall-ticket/${f._id}`)}
                  >
                    Print Hall Ticket
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

export default HallTicketList;
