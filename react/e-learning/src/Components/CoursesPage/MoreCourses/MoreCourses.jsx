import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../CourseDetail.css'

const MoreCourses = () => {

    const { id } = useParams();
    const [allCourses, setAllCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/courses/full/')
          .then(res => res.json())
          .then(data => setAllCourses(data))
          .catch(err => console.error('Error fetching all courses:', err));
      }, []);

    function handleClick(courseId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/dashboard/courses/${courseId}`);
    }
  return (
    <>
        <div className="more-courses-section">
        <h3>More Courses</h3>
        <div className="more-courses-grid">
          {allCourses
            .filter(c => c.id !== Number(id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .map(c => (
              <div key={c.id} className="course-tiles1">
                <img src={c.image} alt={c.title} />
                <h4>{c.title}</h4>
                <button className="enroll-btn" onClick={() => handleClick(c.id)}>
                  View
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default MoreCourses