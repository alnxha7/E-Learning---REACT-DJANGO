import React, { useEffect, useState } from 'react';
import './MyCourses.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/my-courses/', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Failed to load purchased courses', err));
  }, []);

  const getTimeRemaining = (startDateStr, durationInMonths) => {
    if (!startDateStr || !durationInMonths) return 'Unknown';

    const startDate = new Date(startDateStr);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + durationInMonths);

    const now = new Date();

    if (now > endDate) return 'Course Ended';

    let monthsLeft =
      (endDate.getFullYear() - now.getFullYear()) * 12 +
      (endDate.getMonth() - now.getMonth());

    let daysLeft = endDate.getDate() - now.getDate();

    if (daysLeft < 0) {
      monthsLeft -= 1;
      const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      daysLeft += prevMonth.getDate();
    }

    return `${monthsLeft} month(s) ${daysLeft} day(s) left`;
  };

  return (
    <div className="my-courses-container">
      <h2 className="page-title">🎓 Your Purchased Courses</h2>
      {courses.length === 0 ? (
        <p className="no-courses">You haven't purchased any courses yet.</p>
      ) : (
        <ul className="course-list">
          {courses.map(course => (
            <li key={course.id} className="course-list-item">
              <img src={course.image} alt={course.title} className="course-thumbnail" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p className="description">{course.description}</p>
                <div className="meta">
                  <span>🛠 {course.tools_using}</span>
                  <span>⏳ {getTimeRemaining(course.start_date, course.duration_in_months)}</span>
                  <span>💰 ₹{course.cost}</span>
                </div>
              </div>
              <div className="course-actions">
                <button className="view-btn">View</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
