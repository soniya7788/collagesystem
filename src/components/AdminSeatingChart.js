import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function AdminSeatingChart() {

  const [applied, setApplied] = useState(false);

  const [filters, setFilters] = useState({
  examType: "",
  department: "",
  semester: "",
  examSeason: "",
  examYear: ""
});

const [rows, setRows] = useState([]);
const [selectedRows, setSelectedRows] = useState([]);

const fetchData = () => {
  axios.get(
    "http://localhost:5000/api/exam/admin/seating-chart-data",
    { params: filters }
  ).then(res => {
    setRows(res.data);
    setApplied(true); // ✅ mark filters applied
  });
};

const toggleRow = (id) => {

  if (selectedRows.includes(id)) {
    setSelectedRows(selectedRows.filter(i => i !== id));
  } else {
    setSelectedRows([...selectedRows, id]);
  }

};

const selectAllRows = () => {
  const ids = rows.map(r => r.id);
  setSelectedRows(ids);
};

const deleteRows = async () => {

  if (selectedRows.length === 0) {
    alert("Select rows first");
    return;
  }

  if (!window.confirm("Delete selected seating chart records?")) {
    return;
  }

  try {

    await axios.delete(
      "http://localhost:5000/api/exam/admin/delete-forms",
      {
        data: {
          ids: selectedRows
        }
      }
    );

    alert("Deleted successfully");

    setRows(rows.filter(r => !selectedRows.includes(r.id)));

    setSelectedRows([]);

  } catch (err) {
    alert("Delete failed");
  }

};

useEffect(() => {
  axios
    .get("http://localhost:5000/api/exam/admin/seating-chart-data")
    .then(res => setRows(res.data));
}, []);

  return (
     <div style={{ display: "flex" }}>
  {/* SIDEBAR */}
  <AdminSidebar />
     <div style={{ flex: 1, padding: "20px" }}>
      <h2>Seating Chart</h2>
      <br/>
<div style={{ marginBottom: "15px" }}>
     
     <button style={{ backgroundColor:"green" , color:"white", width: "80px", height: "25px" ,fontSize:"16px" }}
  disabled={!applied}
  onClick={() =>
    window.open(
      `/admin-seating-chart-print?${new URLSearchParams(filters)}`,
      "_blank"
    )
  }
>
  Print
</button>

    </div>

<div className="filter-row">
  <select onChange={e => setFilters({ ...filters, examType: e.target.value })} style={{ height: "30px", width:"100px" }}>
    <option value="">Exam Type</option>
    <option value="Regular">Regular</option>
    <option value="Backlog">Supplementary</option>
    <option value="Remedial">Summer Remedial</option>
  </select>
 <>    </>
  <select onChange={e => setFilters({ ...filters, department: e.target.value })} style={{ height: "30px" }}>
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

 <>    </>

  <select onChange={e => setFilters({ ...filters, examSeason: e.target.value })} style={{ height: "30px" }}>
    <option value="">Exam Season</option>
    <option value="Summer">Summer</option>
    <option value="Winter">Winter</option>
  </select>

 <>    </>

  <select onChange={e => setFilters({ ...filters, semester: e.target.value })} style={{ height: "30px" }}>
    <option value="">Semester</option>
    {[1,2,3,4,5,6].map(s => (
      <option key={s} value={s}>Sem {s}</option>
    ))}
  </select>

 <>    </>

  <select onChange={e => setFilters({ ...filters, examYear: e.target.value })} style={{ height: "30px" }}>
    <option value="">Year</option>
    {[2023,2024,2025,2026,2027,2028,2029,2030].map(y => (
      <option key={y} value={y}>{y}</option>
    ))}
  </select>

 <>    </>

  <button onClick={fetchData} style={{ height: "30px", width: "80px" }}>Apply</button>
</div>
<br/>

<div style={{ marginBottom: "10px" }}>

  <button onClick={selectAllRows}>
    Select All
  </button>

  <button
    onClick={deleteRows}
    style={{
      marginLeft: "10px",
      backgroundColor: "red",
      color: "white"
    }}
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
      onChange={selectAllRows}
    />
  </th>

  <th>Sr</th>
            <th>Enrollment No</th>
            <th>Candidate Name</th>
            <th>Scheme</th>
            <th style={{ width: "90%" }}>Subject Appearing For</th>
            <th>Status</th>
            <th>Appear</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>
  <input
    type="checkbox"
    checked={selectedRows.includes(r.id)}
    onChange={() => toggleRow(r.id)}
  />
</td>
              <td>{r.sr}</td>
              <td>{r.enrollment}</td>
              <td>{r.candidateName}</td>
              <td>{r.scheme}</td>
              <td style={{ textAlign: "left" }}>{r.subjects}</td>
              <td>{r.status}</td>
              <td>Y</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default AdminSeatingChart;
