import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentCRUD() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    department: "",
    address: ""
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = "http://localhost:8082/api/students";

  const fetchStudents = () => {
    axios.get(API_URL).then((res) => setStudents(res.data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  
  const generateRegisterNumber = () => {
    //return "420422205035" 
    return "REG" + Date.now(); // always unique
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      axios.put(`${API_URL}/${editId}`, formData).then(() => {
        fetchStudents();
        closeForm();
      });
    } else {
      const newData = {
        ...formData,
        registerNumber: generateRegisterNumber()
      };
      axios.post(API_URL, newData).then(() => {
        fetchStudents();
        closeForm();
      });
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      phoneNumber: student.phoneNumber,
      department: student.department,
      address: student.address,
      registerNumber: student.registerNumber
    });
    setEditId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => fetchStudents());
  };

  const closeForm = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      department: "",
      address: ""
    });
    setEditId(null);
    setShowForm(false);
  };

  const styles = {
    container: { padding: "20px", fontFamily: "Arial, sans-serif" },
    title: { textAlign: "center", color: "#5e2d79", marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      backgroundColor: "#5e2d79",
      color: "white",
      padding: "10px",
      textAlign: "left"
    },
    td: { padding: "10px", borderBottom: "1px solid #ddd" },
    rowEven: { backgroundColor: "#fbeaff" },
    btnEdit: {
      backgroundColor: "#5e2d79",
      color: "white",
      padding: "5px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "5px"
    },
    btnDelete: {
      backgroundColor: "#d90429",
      color: "white",
      padding: "5px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    btnAdd: {
      backgroundColor: "#5e2d79",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginBottom: "15px"
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    formContainer: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    },
    input: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc"
    },
    submitBtn: {
      backgroundColor: "#5e2d79",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    cancelBtn: {
      backgroundColor: "#999",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student Records</h2>

      <button style={styles.btnAdd} onClick={() => setShowForm(true)}>
        Add Student
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>SL NO</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Register No</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Place</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} style={index % 2 !== 0 ? styles.rowEven : {}}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.registerNumber}</td>
              <td style={styles.td}>{student.phoneNumber}</td>
              <td style={styles.td}>{student.department}</td>
              <td style={styles.td}>{student.address}</td>
              <td style={styles.td}>
                <button
                  style={styles.btnEdit}
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  style={styles.btnDelete}
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div style={styles.overlay}>
          <form style={styles.formContainer} onSubmit={handleSubmit}>
            <h3>{editId ? "Update Student" : "Add Student"}</h3>
            <input
              style={styles.input}
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <button style={styles.submitBtn} type="submit">
              {editId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={closeForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default StudentCRUD;
