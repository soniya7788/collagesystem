import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{
      width: "230px",
      background: "#1f4e79",
      color: "white",
      padding: "20px",
      minHeight: "100vh"
    }}>
      <h3 style={{ color: "white", marginBottom: "20px" }}>
        Admin Menu
      </h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link className="side-link" to="/admin-dashboard">
          Approve Students
        </Link>

        <Link className="side-link" to="/admin-exam-forms">
          Approve Exam Forms
        </Link>

<Link className="side-link" to="/admin-seating-chart">
  Seating Chart
</Link>

  <Link className="side-link" to="/admin-subjects">
    Manage Subjects
  </Link>

        <span
          className="side-link"
          style={{ cursor: "pointer", color: "#ffdddd" }}
          onClick={logout}
        >
          Logout
        </span>
      </nav>
    </div>
  );
}

export default AdminSidebar;
