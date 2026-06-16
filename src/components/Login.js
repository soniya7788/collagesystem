import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
const navigate = useNavigate();
const [showGet, setShowGet] = useState(false);
const [email, setEmail] = useState("");
const [prn, setPrn] = useState("");
const [message, setMessage] = useState("");
const [showChange, setShowChange] = useState(false);
const [newPassword, setNewPassword] = useState("");
const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("student");

  // ✅ Student uses EMAIL, not username
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // 🔹 Get Password states

  /* ================= LOGIN ================= */

const getPassword = async () => {

  setLoading(true);
  setMessage("");

  try {

    const res = await axios.post(
      "http://localhost:5000/api/auth/student-forgot",
      { prn, email }
    );

    if (res.data.status === "sent") {
      setMessage("Password sent to email");
    }
    else if (res.data.status === "used") {
      setMessage("Forgot password already used once");
    }
    else {
      setMessage("Invalid PRN/Email");
    }

  } catch (err) {

    setMessage("Failed to send password");

  } finally {

    setLoading(false);

  }

};

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url =
        role === "admin"
          ? "http://localhost:5000/api/auth/admin-login"
          : "http://localhost:5000/api/auth/student-login";

      const payload =
        role === "admin"
          ? { username: email, password } // admin uses username
          : { email, password };           // student uses email

      const res = await axios.post(url, payload);

      if (role === "admin") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/admin-dashboard");
      } else {
        // ✅ VERY IMPORTANT: STORE FULL STUDENT OBJECT
        localStorage.setItem("role", "student");
        localStorage.setItem(
          "student",
          JSON.stringify(res.data.student)
        );

        console.log("Logged in student:", res.data.student); // DEBUG

        navigate("/exam-form");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  /* ================= GET PASSWORD ================= */

    return (
<>
  {/* ===== HEADER ===== */}
  <div className="top-header">

    <div className="header-left">

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnISktbHBxvEoWZusMqkQrWKxBE9Nxd8z8wQ&s"
        alt="College Logo"
        className="header-logo"
      />

      <div>
        <h1>Gramin Technical and Management Campus, Nanded</h1>

        <p>
          Nanded, Maharashtra
        </p>
      </div>

    </div>

  </div>

  {/* ===== LATEST UPDATES ===== */}

  <div className="latest-bar">

    <div className="latest-title">
      LATEST UPDATES
    </div>

   <div className="latest-container">

  <div className="latest-scroll">

    Winter 2026 Exam Form Submission Started |
    Hall Ticket Download Available Soon |
    Students must verify subjects before submission |
    Summer Remedial Forms Last Date: 25 August |

  </div>

</div>
  </div>

  {/* ===== LOGIN SECTION ===== */}
  
    <div
  className="login-wrapper"
  style={{
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.82), rgba(255, 255, 255, 0.67)), url('https://scontent.fnag6-3.fna.fbcdn.net/v/t39.30808-6/490023237_9547345245347710_6301448548927139510_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=jem2b9xZz3kQ7kNvwFpYvgU&_nc_oc=AdpyylKoG1iV-_UJ94X3TbetnXeIfgpNbvrp4pNynqxxzct2GV37nNU-XM73QfoeR1jXfMm55T1tD7IYlDbhHWu-&_nc_zt=23&_nc_ht=scontent.fnag6-3.fna&_nc_gid=rMD29Cp_I4YLHJBahlx_sA&_nc_ss=78289&oh=00_Af7REVek5ob9e4ycqaGny40WnIaftKyUc45JKqfpG8GS5Q&oe=6A1B1903')",

    backgroundSize: "cover",

    backgroundPosition: "center",

    backgroundRepeat: "no-repeat",
    minHeight: "80vh"
  }}
>
    
      <div className="login-card">

        <h2>Exam Portal Login</h2>

        <form onSubmit={handleLogin}>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type={role === "admin" ? "text" : "email"}
            placeholder={role === "admin" ? "Admin Username" : "Student Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error-text">{error}</div>}

          <button type="submit">Login</button>

        </form>



        {/* ===== GET PASSWORD (STUDENT ONLY) ===== */}
       {role === "student" && (
  <>
<div style={{ marginTop: "10px", textAlign: "center" }}>
  <p style={{ textAlign: "center", marginTop: "10px" }}>
            New Student?{" "}
            <span
              style={{ color: "#1f4e79", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
  <span
    style={{ color: "blue", cursor: "pointer", marginRight: "15px" }}
    onClick={() => {
  setShowGet(true);
  setShowChange(false);
}}

  >
    Forgot Password?
  </span>

  <span
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => {
  setShowChange(true);
  setShowGet(false);
}}
  >
    Change Password
  </span>
</div>

<br/>

{message && (
      <p style={{ marginTop: "6px", fontSize: "13px", color: "red"}}>
        {message}
      </p>
    )}

{showGet && (
  <div style={{ marginTop: "10px" }}>
    <input
  type="email"
  placeholder="Registered Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="text"
  placeholder="Enrollment No / PRN"
  value={prn}
  onChange={(e) => setPrn(e.target.value)}
/>

    <button
  type="button"
  onClick={getPassword}
  disabled={loading}
  style={{ marginTop: "6px" }}
>
  {loading ? "Sending..." : "Send Password"}
</button>

  </div>
)}

{showChange && (
  <div style={{ marginTop: "12px" }}>
    <input
      type="text"
      placeholder="Enrollment No / PRN"
      value={prn}
      onChange={e => setPrn(e.target.value)}
    />

    <input
      type="password"
      placeholder="Old Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />

    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={e => setNewPassword(e.target.value)}
    />

    <button
      type="button"
      style={{ marginTop: "6px" }}
      onClick={async () => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/auth/change-password",
            {
              prn,
              oldPassword: password,
              newPassword: newPassword
            }
          );
          setMessage(res.data.message);   // ✅ NOW VISIBLE
        } catch (err) {
          setMessage(err.response?.data?.message || "Error");
        }
      }}
    >
      Change Password
    </button>

  </div>
)}
  </>
)}

      </div>
       </div>

</>
);
}

export default Login;
