
import React, { useState } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    studentName: "",
    teacherName: "",
    subject: "",
    feedback: "",
    rating: "",
  });

  const [errors, setErrors] = useState({
    studentName: "",
    teacherName: "",
    subject: "",
    feedback: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = { ...errors };


    if (!feedback.studentName) {
      errorMessages.studentName = "Student Name is required";
      isValid = false;
    } else {
      errorMessages.studentName = "";
    }

    
    if (!feedback.teacherName) {
      errorMessages.teacherName = "Teacher Name is required";
      isValid = false;
    } else {
      errorMessages.teacherName = "";
    }

    
    if (!feedback.subject) {
      errorMessages.subject = "Subject is required";
      isValid = false;
    } else {
      errorMessages.subject = "";
    }

    
    if (!feedback.feedback) {
      errorMessages.feedback = "Feedback is required";
      isValid = false;
    } else {
      errorMessages.feedback = "";
    }

    
    if (!feedback.rating) {
      errorMessages.rating = "Rating is required";
      isValid = false;
    } else {
      errorMessages.rating = "";
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Feedback Submitted:", feedback);
      alert("Feedback submitted successfully!");
    }
  };

  return (
    <div className="container">
      <h2>Teacher Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            className="form-control"
            name="studentName"
            value={feedback.studentName}
            onChange={handleChange}
            required
          />
          {errors.studentName && (
            <small className="text-danger">{errors.studentName}</small>
          )}
        </div>

    
        <div className="form-group">
          <label>Teacher Name</label>
          <input
            type="text"
            className="form-control"
            name="teacherName"
            value={feedback.teacherName}
            onChange={handleChange}
            required
          />
          {errors.teacherName && (
            <small className="text-danger">{errors.teacherName}</small>
          )}
        </div>

        
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={feedback.subject}
            onChange={handleChange}
            required
          />
          {errors.subject && (
            <small className="text-danger">{errors.subject}</small>
          )}
        </div>

        
        <div className="form-group">
          <label>Feedback</label>
          <textarea
            className="form-control"
            name="feedback"
            rows="5"
            value={feedback.feedback}
            onChange={handleChange}
            required
          />
          {errors.feedback && (
            <small className="text-danger">{errors.feedback}</small>
          )}
        </div>

    
        <div className="form-group">
          <label>Rating (Out of 5)</label>
          <select
            className="form-control"
            name="rating"
            value={feedback.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          {errors.rating && (
            <small className="text-danger">{errors.rating}</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
