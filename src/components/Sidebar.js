import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "230px",
      minHeight: "100vh",
      background: "#2c5d8a",
      color: "white"
    }}>
      <Link className="side-link" to="/dashboard">Home</Link>
      <Link className="side-link" to="/profile">My Profile</Link>
      <Link className="side-link" to="/exam-form">Exam Form</Link>
      <Link className="side
      -link" to="/hall-ticket">Hall Ticket</Link>
      <Link className="side-link" to="/">Logout</Link>
    </div>
  );
}

export default Sidebar;
