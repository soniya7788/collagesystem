import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

//import { useNavigate } from "react-router-dom";


function AdminExamForms() {
  const [forms, setForms] = useState([]);
//const navigate = useNavigate();
const [department, setDepartment] = useState("");
const [semester, setSemester] = useState("");
const [payment, setPayment] = useState("");
const [approval, setApproval] = useState("");
const [selectedForms, setSelectedForms] = useState([]);
const [viewForm, setViewForm] = useState(null);

const selectAll = () => {
  const ids = forms.map(f => f._id);
  setSelectedForms(ids);
};

const toggleSelect = (id) => {
  if (selectedForms.includes(id)) {
    setSelectedForms(selectedForms.filter(i => i !== id));
  } else {
    setSelectedForms([...selectedForms, id]);
  }
};

const deleteSelected = async () => {

  if (selectedForms.length === 0) {
    alert("Select records first");
    return;
  }

  if (!window.confirm("Delete selected forms?")) return;

  await axios.delete(
    "https://collagesystem-backend.onrender.com/api/exam/admin/delete-forms",
    { data: { ids: selectedForms } }
  );

  alert("Deleted successfully");

  setForms(forms.filter(f => !selectedForms.includes(f._id)));
  setSelectedForms([]);
};


  useEffect(() => {
    axios.get("https://collagesystem-backend.onrender.com/api/exam/admin/forms")
      .then(res => setForms(res.data));
  }, []);

  const markPaymentDone = async (id) => {
    await axios.put(`https://collagesystem-backend.onrender.com/api/exam/admin/payment/${id}`);
    window.location.reload();
  };

  const approveForm = async (id) => {
    await axios.put(`https://collagesystem-backend.onrender.com/api/exam/admin/approve/${id}`);
    window.location.reload();
  };

 return (
  <div style={{ display: "flex" }}>
    {/* SIDEBAR */}
    <AdminSidebar />
  

  
    {/* MAIN CONTENT */}
    <div style={{ flex: 1, padding: "20px" }}>

      <h2>Approve Exam Forms</h2>
       <br /> 
      <div className="admin-filters">
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

  <select onChange={e => setSemester(e.target.value)}>
    <option value="">All Semesters</option>
    {[1,2,3,4,5,6].map(s => (
      <option key={s} value={s}>Sem {s}</option>
    ))}
  </select>

  <select onChange={e => setPayment(e.target.value)}>
    <option value="">All Payments</option>
    <option value="paid">Paid</option>
    <option value="unpaid">Unpaid</option>
  </select>

  <select onChange={e => setApproval(e.target.value)}>
    <option value="">All Approval</option>
    <option value="approved">Approved</option>
    <option value="pending">Pending</option>
  </select>
</div>

<div style={{marginBottom:"10px"}}>
  <button onClick={selectAll}>Select All</button>

  <button
    style={{marginLeft:"10px", background:"red", color:"white"}}
    onClick={deleteSelected}
  >
    Delete Selected
  </button>
</div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>
  <input
    type="checkbox"
    onChange={selectAll}
  />
</th>
            <th>PRN</th>
            <th>Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Exam</th>
            <th>Payment</th>
            <th>Approval</th>
            <th>Actions</th>
            <th>View Exam Form</th>
          </tr>
        </thead>

        <tbody>
          {forms
  .filter(f => {
    if (department && f.department !== department) return false;
    if (semester && f.semester !== Number(semester)) return false;
    if (payment === "paid" && !f.paymentVerified) return false;
    if (payment === "unpaid" && f.paymentVerified) return false;
    if (approval === "approved" && !f.formApproved) return false;
    if (approval === "pending" && f.formApproved) return false;
    return true;
  })
  .map(form => (

            <tr key={form._id}>
              <td>
  <input
    type="checkbox"
    checked={selectedForms.includes(form._id)}
    onChange={() => toggleSelect(form._id)}
  />
</td>
  <td>{form.studentId?.prn || "N/A"}</td>
  <td>{form.studentId?.name || "N/A"}</td>
  <td>{form.department}</td>
  <td>{form.semester}</td>
  <td>{form.examSeason} {form.examYear}</td>

  <td>
    {form.paymentVerified ? (
      <span style={{ color: "green" }}>Done</span>
    ) : (
      <span style={{ color: "orange" }}>Pending</span>
    )}
  </td>

  <td>
    {form.formApproved ? (
      <span style={{ color: "green" }}>Approved</span>
    ) : (
      <span style={{ color: "orange" }}>Pending</span>
    )}
  </td>


<td>

  {/* 🔹 PAYMENT DONE — visible until paymentVerified */}
  {!form.paymentVerified && (
    <button
      onClick={() => markPaymentDone(form._id)}
      style={{ marginRight: "6px" }}
    >
      Payment Done
    </button>
  )}

  {/* 🔹 ALLOW EDIT */}
{!form.formApproved && !form.allowEdit && (
  <button
    onClick={async () => {
      await axios.put(
        `https://collagesystem-backend.onrender.com/api/exam/admin/allow-edit/${form._id}`
      );
      window.location.reload();
    }}
  >
    Allow Edit
  </button>
)}

  {/* 🔹 APPROVE — only after payment done */}
  {form.paymentVerified && !form.formApproved && (
    <button
      onClick={() => approveForm(form._id)}
      style={{ backgroundColor: "green", color: "white" }}
    >
      Approve
    </button>
  )}

  {/* 🔹 FINAL STATE */}
  {form.formApproved && (
    <span style={{ color: "green", fontWeight: "bold" }}>
      Approved
    </span>
  )}

</td>


  <td>
    {form.editedAfterAllow && !form.formApproved && (
  <span style={{ color: "green", fontWeight: "bold" }}>
    (Edited)
  </span>
)}

  <button
  className="btn view"
  onClick={() => window.open(`/print-exam-form/${form._id}`, '_blank', 'width=900,height=800')}
>
  View Exam Form
</button>
 </td>
</tr>

          ))}
          
        </tbody>
      </table>

      {viewForm && (
  <div className="exam-view-overlay">
    <div className="exam-view-container">
      <button
        className="close-btn"
        onClick={() => setViewForm(null)}
      >
        ✕ Close
      </button>

      <iframe
  src={`http://localhost:3000/print-exam-form-page/${viewForm._id}`}
  title="Exam Form"
  className="exam-view-iframe"
/>

    </div>
  </div>
)}


    </div>
  </div>
  
);

}

export default AdminExamForms;
