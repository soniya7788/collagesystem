import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function Dashboard() {
  const navigate = useNavigate();

  // ✅ FIX: define student
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "student") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="dashboard-content">
        <h2>Student Dashboard</h2>

        <p className="welcome-text">
          Welcome to Gramin Technical and Management Campus Exam Portal
        </p>

        <div className="card-row">
          <div className="dash-card">
            <h4>Exam Form Status</h4>
            <p>Not Submitted</p>
          </div>

          <div className="dash-card">
            <h4>Hall Ticket</h4>
            <p>Available after approval</p>
          </div>

          <div className="dash-card">
            <h4>Current Semester</h4>
            <p>Semester {student?.semester}</p>
          </div>
        </div>

        <div className="notice-box">
          <h3>Important Notices</h3>
          <ul>
            <li>Exam form submission for current semester is open.</li>
            <li>Hall ticket will be available after successful approval.</li>
            <li>Contact office for corrections before exam date.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
