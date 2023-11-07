import React from "react";
import CourseDetails from "./components/CourseDetails";
import CourseListing from "./components/CourseListing";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./components/StudentDashboard";
import StudentIdInput from "./components/StudentInput";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CourseListing />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/dashboard" element={<StudentIdInput />} />
        <Route path="/student-dashboard/:studentId" element={<StudentDashboard />} />
      </Routes>
    </>
  );
}

export default App;
