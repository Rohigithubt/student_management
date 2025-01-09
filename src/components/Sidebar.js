import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
       
        <ul className="nav flex-column">
        <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">
            <h4>Dashboard</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create-student" className="nav-link text-white">
              Create Student
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all-students" className="nav-link text-white">
              All Students
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/feedback" className="nav-link text-white">
              Feedback
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-3">
    
      </div>
    </div>
  );
};

export default Sidebar;
