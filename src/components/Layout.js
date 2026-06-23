import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout({ children, hideSidebar = false }) {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app-container">

      {/* ===== SIDEBAR ===== */}
      {!hideSidebar && (
        <aside className="sidebar">
          <div className="sidebar-college">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnISktbHBxvEoWZusMqkQrWKxBE9Nxd8z8wQ&s"
              alt="college"
            />
            <div>Gramin Technical and Management Campus</div>
            <small>Nanded (Code: 0069)</small>
          </div>

          <nav className="sidebar-nav">
            <Link to="/profile">My Profile</Link>
            <Link to="/exam-form">Exam Form</Link>
            <Link to="/print-exam-form">Print Exam Form</Link>
            <Link to="/hall-tickets">Hall Ticket</Link>
            <span onClick={logout}>Logout</span>
          </nav>
        </aside>
      )}

      {/* ===== MAIN AREA ===== */}
      <main className="main-area">

        {/* ===== HEADER ===== */}
        {!hideSidebar && (
          <header className="top-header">
            <div className="header-left">
              <b>{student?.name}</b> | Enrollment No: {student?.prn}
            </div>

            <div className="header-right">
              <img
                src="https://cdn-icons-png.freepik.com/512/8608/8608769.png"
                alt="profile"
                className="profile-icon"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="profile-dropdown">
                  <img
                    src={`https://collagesystem-backend.onrender.com/uploads/${student?.photo}`}
                    alt="student"
                  />
                  <h4>{student?.name}</h4>
                  <p>{student?.department}</p>
                  <p>{student?.prn}</p>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          </header>
        )}

        <div className="page-content">
          {children}
        </div>

      </main>
    </div>
  );
}


export default Layout;
