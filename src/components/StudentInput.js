import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentIdInput.css'; 

const StudentIdInput = () => {
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  const handleStudentIdSubmit = (e) => {
    e.preventDefault();
    navigate(`/student-dashboard/${studentId}`);
  };

  return (
    <div className="container"> 
      <h2 className="title">Welcome to Student Dashboard</h2>
      <form onSubmit={handleStudentIdSubmit}>
        <label className="label">
          Please enter student ID:
          <input
            type="text"
            value={studentId}
            placeholder='Enter any number between 101-108'
            onChange={(e) => setStudentId(e.target.value)}
            className="input"
          />
        </label>
        <button type="submit" className="button">Go to Dashboard</button>
      </form>
    </div>
  );
};

export default StudentIdInput;
