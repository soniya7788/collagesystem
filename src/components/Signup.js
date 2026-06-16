import { useEffect, useState } from "react";
import axios from "axios";

function Signup() {

  const [departments, setDepartments] = useState([]);

  const [data, setData] = useState({
    prn: "",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    department: "",
    year: "",
    semester: "",
    photo: null
  });

  /* ================= FETCH DEPARTMENTS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exam/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  /* ================= SUBMIT ================= */
  const signup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    await axios.post(
      "http://localhost:5000/api/students/signup",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Signup successful. Wait for admin approval.");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2>Student Signup</h2>

        <form onSubmit={signup} className="signup-form">

          {/* ===== PERSONAL DETAILS ===== */}
          <h3 className="form-section-title">Personal Details</h3>

          <div className="form-grid">
            <input
              type="text"
              placeholder="PRN"
              value={data.prn}
              onChange={e => setData({ ...data, prn: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Full Name"
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Email (Login ID)"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              required
            />

            <input
              type="date"
              value={data.dob}
              onChange={e => setData({ ...data, dob: e.target.value })}
              required
            />

            <select
              value={data.gender}
              onChange={e => setData({ ...data, gender: e.target.value })}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="text"
              placeholder="Mobile Number"
              value={data.mobile}
              onChange={e => setData({ ...data, mobile: e.target.value })}
              required
            />
          </div>

          {/* ===== ACADEMIC DETAILS ===== */}
          <h3 className="form-section-title">Academic Details</h3>

          <div className="form-grid">

            {/* ✅ DEPARTMENT DROPDOWN */}
            <select
              value={data.department}
              onChange={e => setData({ ...data, department: e.target.value })}
              required
            >
              <option value="">Select Department</option>
              {departments.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={data.year}
              onChange={e => setData({ ...data, year: e.target.value })}
              required
            >
              <option value="">Select Year</option>
              <option value="First">First Year</option>
              <option value="Second">Second Year</option>
              <option value="Third">Third Year</option>
            </select>

            <select
              value={data.semester}
              onChange={e => setData({ ...data, semester: e.target.value })}
              required
            >
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>

          <div>
  <label style={{fontSize:"13px" }}
  >
    Passport Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={e =>
      setData({
        ...data,
        photo: e.target.files[0]
      })
    }
    required
  />
</div>
          </div>

          <button type="submit" className="submit-btn">
            Submit Registration
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already registered?{" "}
          <span
            style={{ color: "#1f4e79", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => (window.location.href = "/")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;
