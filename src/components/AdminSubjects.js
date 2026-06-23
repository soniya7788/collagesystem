import { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function AdminSubjects() {

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [subjects, setSubjects] = useState([
    {
      name: "",
      code: "",
      short: "",

      TH: false,
      PR: false,

      FA_TH: false,
      SA_TH: false,

      FA_PR: false,
      SA_PR: false,

      SLA: false
    }
  ]);

  const addRow = () => {

    setSubjects([
      ...subjects,
      {
        name: "",
        code: "",
        short: "",

        TH: false,
        PR: false,

        FA_TH: false,
        SA_TH: false,

        FA_PR: false,
        SA_PR: false,

        SLA: false
      }
    ]);

  };

  const updateField = (index, field, value) => {

    const copy = [...subjects];

    copy[index][field] = value;

    setSubjects(copy);

  };

  const fetchSubjects = async (editable) => {

  if (!department || !semester) {
    alert("Select department and semester");
    return;
  }

  try {

    const res = await axios.get(
      `https://collagesystem-backend.onrender.com/api/exam/subjects?department=${department}&semester=${semester}`
    );

    const subjectData = res.data;

    // merge with short codes
const shortRes = await axios.get(
  `https://collagesystem-backend.onrender.com/api/exam/subject-shortcodes?department=${department}&semester=${semester}`
);

const shortData = shortRes.data || [];

const merged = subjectData.map((sub, index) => {

  const shortMatch = shortData[index];

  return {

    ...sub,

    code: shortMatch ? shortMatch.code : "",

    short: shortMatch ? shortMatch.short : ""

  };

});

    setSubjects(merged);

    setEditMode(editable);

  } catch (err) {

  alert("No subjects found. Add new subjects.");

  setSubjects([
    {
      name: "",
      code: "",
      short: "",

      TH: false,
      PR: false,

      FA_TH: false,
      SA_TH: false,

      FA_PR: false,
      SA_PR: false,

      SLA: false
    }
  ]);

  setEditMode(true);

}

};

  const saveSubjects = async () => {

    if (!department || !semester) {
      alert("Select department and semester");
      return;
    }

    try {

      await axios.post(
        "https://collagesystem-backend.onrender.com/api/exam/admin/add-subjects",
        {
          department,
          semester,
          subjects
        }
      );

      alert("Subjects saved successfully");

    } catch (err) {

      alert("Save failed");

    }

  };

  return (

    <div style={{ display: "flex" }}>

      <AdminSidebar />

      <div style={{ flex: 1, padding: "20px" }}>

        <h2>Manage Subjects</h2>

        <br />

        <div className="admin-filters">

          <select
            onChange={e => setDepartment(e.target.value)}
          >

            <option value="">Select Department</option>

            <option>Computer Engineering</option>
            <option>Information Technology</option>
            <option>Civil Engineering</option>
            <option>Electrical Engineering</option>
            <option>Mechanical Engineering</option>
            <option>Medical Laboratory Technology</option>
            <option>Hotel Management and Catering Technology</option>
            <option>Electronics and Telecommunication Engineering</option>

          </select>

          <select
            onChange={e => setSemester(e.target.value)}
          >

            <option value="">Select Semester</option>

            {[1,2,3,4,5,6].map(s => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}

          </select>

<div style={{ marginBottom: "15px" }}>

  <button
    onClick={() => fetchSubjects(false)}
    style={{ height:"30px", width:"40px",
      marginRight: "10px"
    }}
  >
    View
  </button>

  <button
    onClick={() => fetchSubjects(true)}
    style={{ height:"30px", width:"50px" }}
  >
    Update
  </button>

</div>
        </div>

        <br />

        <table className="admin-table">

          <thead>

            <tr>

              <th>Subject Name <br/>with Code eg. Linux (02203)</th>

              <th>Course Code</th>

              <th>Short</th>

              <th>TH (If only practical subject then don't select)</th>

              <th>PR (If only theory subject then don't select)</th>

              <th>FA TH</th>

              <th>SA TH</th>

              <th>FA PR</th>

              <th>SA PR</th>

              <th>SLA</th>

            </tr>

          </thead>

          <tbody>

            {subjects.map((sub, i) => (

              <tr key={i}>

                <td>
                  <input
  disabled={!editMode}
  value={sub.name}
                    onChange={e =>
                      updateField(i, "name", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    disabled={!editMode}
                    value={sub.code}
                    onChange={e =>
                      updateField(i, "code", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    disabled={!editMode}
                    value={sub.short}
                    onChange={e =>
                      updateField(i, "short", e.target.value)
                    }
                  />
                </td>

                {[
                  "TH",
                  "PR",
                  "FA_TH",
                  "SA_TH",
                  "FA_PR",
                  "SA_PR",
                  "SLA"
                ].map(field => (

                  <td key={field}>

                    <input
                      type="checkbox"
                      disabled={!editMode}
                      checked={sub[field]}
                      onChange={e =>
                        updateField(
                          i,
                          field,
                          e.target.checked
                        )
                      }
                    />

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

        <br />

        <button onClick={addRow}>
          + Add Subject
        </button>

        <button
          onClick={saveSubjects}
          style={{
            marginLeft: "10px",
            background: "green",
            color: "white"
          }}
        >
          Save Subjects
        </button>

      </div>

    </div>

  );

}

export default AdminSubjects;