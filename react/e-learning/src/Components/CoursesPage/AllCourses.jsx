import React, { useEffect, useState } from 'react';
import './AllCourses.css';
import { Navigate, useNavigate } from 'react-router-dom';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  function handleClick(course) {
    console.log("clicked");
    console.log(`id is ${course.id}`);
    navigate(`/dashboard/courses/${course.id}`);
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/courses/full/')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

  return (
    <div className="all-courses-container">
      <h2 className="section-title">All Courses</h2>
      <div className="all-courses-grid">
        {courses.map((course) => (
        <div className="course-tiles" key={course.id}>
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <button className="enroll-btn" onClick={() => handleClick(course)}>
            View Course
            </button>
        </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
