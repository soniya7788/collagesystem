import Layout from "./Layout";

function Profile() {
  const student = JSON.parse(localStorage.getItem("student"));

  if (!student) {
    return (
      <Layout>
        <p>No student data found. Please login again.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="form-box">
        <h2>My Profile</h2>

        <p><b>Name:</b> {student.name}</p>
        <p><b>PRN:</b> {student.prn}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Department:</b> {student.department}</p>
        <p><b>Year:</b> {student.year}</p>
      </div>
    </Layout>
  );
}

export default Profile;
