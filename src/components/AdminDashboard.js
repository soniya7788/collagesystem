import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  
  const navigate = useNavigate();
 const [students, setStudents] = useState([]);
const [selected, setSelected] = useState(null);

const [status, setStatus] = useState("");        // approved / pending
const [department, setDepartment] = useState(""); // branch
const [search, setSearch] = useState("");         // prn / name
const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      navigate("/");
    }

    axios
      .get("http://localhost:5000/api/admin/students")
      .then((res) => setStudents(res.data));
  }, [navigate]);

const approveStudent = async (id) => {

  setApprovingId(id);

  try {

    const res = await axios.put(
      `http://localhost:5000/api/admin/approve/${id}`
    );

    alert("Student approved.\nPassword: " + res.data.password);

    window.location.reload();

  } catch (err) {

    alert("Approval failed");

  } finally {

    setApprovingId(null);

  }

};

  return (
  <div style={{ display: "flex" }}>
    {/* SIDEBAR */}
    <AdminSidebar />

    {/* MAIN CONTENT */}
    <div style={{ flex: 1, padding: "20px" }}>
      <h2>Approve Students</h2>
<br/>
      {/* FILTERS */}
      <div className="admin-filters">
        <select onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="approved">Approved</option>``
          <option value="pending">Pending</option>
        </select>

        <select onChange={e => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          <option>Computer Engineering</option>
          <option>Information Technology</option>
          <option>Civil Engineering</option>
          <option>Electrical Engineering</option>
          <option>Mechanical Engineering</option>
          <option>Medical Laboratory Technology</option>
          <option>Hotel Management and Catering Technology</option>
          <option>Electronics and Telecommunication Engineering</option>
        </select>

        <input
          type="text"
          placeholder="Search PRN / Name"
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* STUDENT TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>PRN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Password</th> 
          </tr>
        </thead>

        <tbody>
          {students
            .filter(s => {
              if (status === "approved" && !s.approved) return false;
              if (status === "pending" && s.approved) return false;
              if (department && s.department !== department) return false;
              if (
                search &&
                !s.prn.toLowerCase().includes(search.toLowerCase()) &&
                !s.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return false;
              }
              return true;
            })
            .map(s => (
              <tr key={s._id}>
  <td>{s.prn}</td>
  <td>{s.name}</td>
  <td>{s.email}</td>

  <td>
    {s.approved ? (
      <span style={{ color: "green", fontWeight: "bold" }}>
        Approved
      </span>
    ) : (
      <span style={{ color: "orange", fontWeight: "bold" }}>
        Pending
      </span>
    )}
  </td>
                <td>
                  <button
                    className="btn view"
                    onClick={() => setSelected(s)}
                  >
                    View
                  </button>

                  {!s.approved && (
                    <button
  className="btn approve"
  disabled={approvingId === s._id}
  onClick={() => approveStudent(s._id)}
>
  {approvingId === s._id ? "Sending..." : "Approve"}
</button>
                  )}
                </td>
                <td style={{ fontFamily: "monospace" }}>
    {s.password}
  </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* VIEW STUDENT MODAL */}
      {selected && (
        <div className="modal">
          <div className="modal-box">
            <h3>Student Details</h3>

            <img
              src={
                selected.photo
                  ? `http://localhost:5000/uploads/${selected.photo}`
                  : "https://via.placeholder.com/120"
              }
              alt="Student"
            />

            <p><b>Name:</b> {selected.name}</p>
            <p><b>PRN:</b> {selected.prn}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Mobile:</b> {selected.mobile}</p>
            <p><b>Department:</b> {selected.department}</p>
            <p><b>Year:</b> {selected.year}</p>
            <p><b>Semester:</b> {selected.semester}</p>
            
            <button onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default AdminDashboard;
