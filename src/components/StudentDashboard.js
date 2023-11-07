
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourses, markCourseAsCompleted } from "../store/courseSlice";
import { fetchStudents } from "../store/studentSlice"; 
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.data);
  const students = useSelector((state) => state.students.data); 
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudents()); 
  }, [dispatch]);

  if (!courses || courses.length === 0 || !students || students.length === 0) {
    return <div>No courses or students available.</div>;
  }

  const student = students.find(
    (student) => student.id === parseInt(studentId)
  );

  if (!student) {
    return <div>Student not found.</div>;
  }

  
  const studentCourses = courses.filter((course) =>
    course.students.some((student) => student.id === parseInt(studentId))
  );

  if (studentCourses.length === 0) {
    return <div>No courses enrolled for this student.</div>;
  }

  return (
    <div>
      <h2 className="dashboard-title" onClick={() =>navigate("/dashboard")} style={{cursor:"pointer"}}>Student Dashboard</h2>
      <div className="dashboard-container">
        <div className="student-details">
          <h3>Student Information</h3>
          <p>Name: {student.name}</p>
          <p>Email: {student.email}</p>
        </div>

        <div className="enrolled-courses">
          <h3>Enrolled Courses</h3>
          {studentCourses.map((course) => (
            <div key={course.id} className="course-card">
              <img
                src={course.thumbnail}
                alt={course.name}
                className="course-thumbnail"
              />
              <div className="course-details">
                <h3>{course.name}</h3>
                <p>Instructor: {course.instructor}</p>
                <p>Due Date: {course.dueDate || "N/A"}</p>
                <div className="progress-bar">
                  <div
                    className={`progress ${
                      course.completed ? "" : "incomplete"
                    }`}
                    style={{
                      width: course.completed ? "100%" : "80%", 
                    }}
                  >
                    {course.completed ? "Completed" : "Incomplete"}
                  </div>
                </div>

                <div className="button-container">
                  <button
                    onClick={() => dispatch(markCourseAsCompleted(course.id))}
                    disabled={course.completed}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
