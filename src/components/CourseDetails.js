import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/59263fcc-f004-4c03-9589-e397b77ebaba');
        const data = await response.json();
        const selectedCourse = data.courses.find(
          (course) => course.id === parseInt(id)
        );
        setCourse(selectedCourse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const toggleSyllabus = () => {
    setIsSyllabusExpanded(!isSyllabusExpanded);
  };
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details-container">
      <div className="course-image-container">
        <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />
      </div>
      <div className="course-info-container">
        <h1 className="course-title">{course.name}</h1>
        <p className="instructor">Instructor: {course.instructor}</p>
        <p className="description">{course.description}</p>
        <p className="enrollment-status">Enrollment Status: {course.enrollmentStatus}</p>
        <p className="duration">Duration: {course.duration}</p>
        <p className="schedule">Schedule: {course.schedule}</p>
        <p className="location">Location: {course.location}</p>
        <h2 className="prerequisites-title">Prerequisites:</h2>
        <ul className="prerequisites">
          {course.prerequisites.map((prerequisite, index) => (
            <li key={index}>{prerequisite}</li>
          ))}
        </ul>
        <button className={!isSyllabusExpanded ? "syllabus-toggle" : "syllabus-toggle collapsed"} onClick={toggleSyllabus}>
        {isSyllabusExpanded ? 'Collapse Syllabus' : 'Expand Syllabus'}
      </button>
      
      {isSyllabusExpanded && (
        <div className="syllabus">
          <h2>Syllabus</h2>
          <ul>
            {course.syllabus.map((item, index) => (
              <li key={index}>
                <strong>Week {item.week}:</strong> {item.topic} - {item.content}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
      <Link to="/" className="back-button">
        Back to Course Listing
      </Link>
    </div>
  );
};

export default CourseDetails;
