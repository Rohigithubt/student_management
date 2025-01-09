import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles.css';
const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the students!", error);
      });
  }, []);

  const handleUpdate = (student) => {
    setCurrentStudent(student);
    setShowModal(true);
  };

  const handleDelete = (student) => {
    console.log(student)
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
    console.log("This is"+showDeleteConfirm)
  };

  const handleConfirmDelete = () => {
    
    axios.delete(`http://localhost:5000/api/students/${studentToDelete.id}`)
      .then(() => {
        
        setStudents(students.filter(student => student.id !== studentToDelete.id));
        setShowDeleteConfirm(false);
      })
      .catch(error => {
        console.error("There was an error deleting the student!", error);
      });
  };

  const handleSave = () => {
    
    axios.put(`http://localhost:5000/api/students/${currentStudent.id}`, currentStudent)
      .then(() => {
        setStudents(students.map(student =>
          student.id === currentStudent.id ? currentStudent : student
        ));
        setShowModal(false);
      })
      .catch(error => {
        console.error("There was an error updating the student!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  return (
    <div className="container">
      <h2>Students List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.branch}</td>
              <td>{student.semester}</td>
              <td>{student.dateofbirth}</td>
              <td>
                <button onClick={() => handleUpdate(student)}>Update</button>
                <button onClick={() => handleDelete(student)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {showModal && (
        <div className="alert">
          <div className="alert-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h3>Update Student</h3>
            {currentStudent && (
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentStudent.name}
                  onChange={handleChange}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={currentStudent.email}
                  onChange={handleChange}
                />
                <label>Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={currentStudent.branch}
                  onChange={handleChange}
                />
                <label>Semester</label>
                <input
                  type="text"
                  name="semester"
                  value={currentStudent.semester}
                  onChange={handleChange}
                />
                  <label>Date of Birth</label>
                <input
                  type="text"
                  name="date of birth"
                  value={currentStudent.dateOfBirth}
                  onChange={handleChange}
                />
                 
                <button onClick={handleSave}>Save Changes</button>
              </div>
            )}
          </div>
        </div>
      )}

    
{showDeleteConfirm && (
                <div className="alert">
                    <div className="alert-content">
                        <span
                            className="close"
                            onClick={() => setShowDeleteConfirm(false)}
                            style={{ cursor: "pointer", float: "right", fontSize: "20px" }}
                        >
                            &times;
                        </span>
                        <h3>Are you sure you want to delete this student?</h3>
                        <div>
                            <button onClick={handleConfirmDelete}>Yes, Delete</button>
                            <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
};

export default AllStudents;
