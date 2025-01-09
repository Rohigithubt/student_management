

import React,{useState} from 'react'
import axios from 'axios';
function Createstudent() {
   const [studentCreated, setStudentCreated] = useState(false);
    const [student, setStudent] = useState({
        name: '',
        email: '',
        dateofbirth: '',
        branch: '',
        semester: '',
        photo: null,
      });
    
      const [errors, setErrors] = useState({
        name: '',
        email: '',
        dateofbirth: '',
        branch: '',
        semester: '',
        photo: '',
      });
    

      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
      };
    
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setStudent({ ...student, [name]: files[0] });
      };
    
      const validateForm = () => {
        let isValid = true;
        let errorMessages = { ...errors };
    
        if (!student.name) {
          errorMessages.name = 'Name is required';
          isValid = false;
        } else {
          errorMessages.name = '';
        }
    
        
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!student.email) {
          errorMessages.email = 'Email is required';
          isValid = false;
        } else if (!emailPattern.test(student.email)) {
          errorMessages.email = 'Enter a valid email';
          isValid = false;
        } else {
          errorMessages.email = '';
        }
    
        
        if (!student.dateofbirth) {
          errorMessages.dateofbirth = 'Date of Birth is required';
          isValid = false;
        } else {
          errorMessages.dateofbirth = '';
        }
    
    
        if (!student.branch) {
          errorMessages.branch = 'Branch is required';
          isValid = false;
        } else {
          errorMessages.branch = '';
        }
    
        
        if (!student.semester) {
          errorMessages.semester = 'Semester is required';
          isValid = false;
        } else {
          errorMessages.semester = '';
        }
    
        
        if (!student.photo) {
          errorMessages.photo = 'Photo is required';
          isValid = false;
        } else {
          errorMessages.photo = '';
        }
    
        setErrors(errorMessages);
        return isValid;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log('Form data:', student);
          try {
           
            const response = await axios.post("http://localhost:5000/api/students", student);
            
            
            console.log(response.data);
        } catch (error) {
           
            console.error(error);
        }
          alert('Form submitted successfully!');
          setStudentCreated(true);
        }
      };
    

     
  return (
    <div className="container">
      
      <h2>Student Details Form</h2>
      {!studentCreated ?
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

     
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dateofbirth"
            value={student.dateofbirth}
            onChange={handleChange}
            required
          />
          {errors.dateofbirth && <small className="text-danger">{errors.dateofbirth}</small>}
        </div>

        
        <div className="form-group">
          <label>Branch</label>
          <input
            type="text"
            className="form-control"
            name="branch"
            value={student.branch}
            onChange={handleChange}
            required
          />
          {errors.branch && <small className="text-danger">{errors.branch}</small>}
        </div>

        <div className="form-group">
          <label>Semester</label>
          <select
            className="form-control"
            name="semester"
            value={student.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
          {errors.semester && <small className="text-danger">{errors.semester}</small>}
        </div>

        <div className="form-group">
          <label>Photo</label>
          <input
            type="file"
            className="form-control"
            name="photo"
            onChange={handleFileChange}
            required
          />
          {errors.photo && <small className="text-danger">{errors.photo}</small>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      :<h2>Thanks for submitting</h2>}
    </div>
  )
}
export default Createstudent;