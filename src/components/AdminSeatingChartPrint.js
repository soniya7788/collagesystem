import axios from "axios";
import { useEffect, useState, useMemo } from "react";

function AdminSeatingChartPrint() {
  const [rows, setRows] = useState([]);

const params = useMemo(() => {
  return new URLSearchParams(window.location.search);
}, []);

const examSeason = params.get("examSeason") || "";
const examYear = params.get("examYear") || "";

useEffect(() => {
  axios.get(
    "http://localhost:5000/api/exam/admin/seating-chart-data",
    { params: Object.fromEntries(params) }
  ).then(res => setRows(res.data));
}, [params]);

  return (
    
    <div id="print-area">
<br/>
<button
  onClick={() => window.print()}
  style={ { marginBottom: "10px", color: "white", backgroundColor: "green", width: "100px", height: "25px" } }
>
  Download PDF
</button>
  {/* ================= HEADER ================= */}
<div className="sc-header">

  <div className="sc-header-top">
    <div className="sc-logo-box">
      <img width="50" height="50"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnISktbHBxvEoWZusMqkQrWKxBE9Nxd8z8wQ&s"
        alt="GTMC Logo"
      />
    </div>

    <div className="sc-header-center">
      
      <h2>Gramin Technical &amp; Management Campus, Nanded</h2>
      <p>(An academically Autonomous Institute)</p>
    </div>
  </div>

  <div className="sc-main-title">
           Seating Chart for examinations to be held in {examSeason} {examYear}
</div>

</div>   

      <table
  className="seating-table"
  border="1"
  width="100%"
  cellPadding="6"
>
  <thead>
    <tr>
      <th>Sr</th>
      <th>Enrollment No</th>
      <th>Candidate Name</th>
      <th>Scheme</th>
      <th>Subject Appearing For</th>
      <th>Status code</th>
      <th>Appear code</th>
    </tr>
  </thead>
  <tbody>
    {rows.map((r, i) => (
      <tr key={i}>
        <td>{r.sr}</td>
        <td>{r.enrollment}</td>
        <td>{r.candidateName}</td>
        <td>{r.scheme}</td>
        <td className="subject-col">{r.subjects}</td>
        <td>{r.status}</td>
        <td>{r.appear}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default AdminSeatingChartPrint;
