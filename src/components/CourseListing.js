import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./CourseListing.css"

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/59263fcc-f004-4c03-9589-e397b77ebaba');
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Filter courses based on the search query
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="course-list-container">
      <h1 className="course-list-title">Course Listing</h1>
      <input
        type="text"
        placeholder="Search by course name or instructor"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul className="course-list">
        {filteredCourses.map((course) => (
          <li key={course.id} className="course-list-item">
            <Link to={`/course/${course.id}`} className="course-link">
              {course.name}
            </Link>
            <p className="instructor">Instructor: {course.instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseListing;
