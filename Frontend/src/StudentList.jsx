import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Internal CSS styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
    },
    title: {
      textAlign: "center",
      color: "#5e2d79",
      marginBottom: "20px",
    },
    addButton: {
      backgroundColor: "#5e2d79",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      marginBottom: "10px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#5e2d79",
      color: "white",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    rowEven: {
      backgroundColor: "#fbeaff",
    },
    buttonView: {
      backgroundColor: "#00b4d8",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "5px",
    },
    buttonEdit: {
      backgroundColor: "#5e2d79",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "5px",
    },
    buttonDelete: {
      backgroundColor: "#d90429",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student Records</h2>
      <button style={styles.addButton}>Add new Student</button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>SL NO</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Place</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={student.id}
              style={index % 2 !== 0 ? styles.rowEven : {}}
            >
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.address}</td>
              <td style={styles.td}>{student.phoneNumber}</td>
              <td style={styles.td}>
                <button style={styles.buttonView}>View</button>
                <button style={styles.buttonEdit}>Edit</button>
                <button style={styles.buttonDelete}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
