import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CourseDetail.css';
import MoreCourses from './MoreCourses/MoreCourses';
import Cookies from 'js-cookie';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const timerRef = useRef(null);
  const [isEnrolled, setIsEnrolled] = useState(false);


  useEffect(() => {
    fetch('http://localhost:8000/api/csrf/', {
      credentials: 'include'
    });
  }, []);

  useEffect(() => {
  if (!course) return;

  fetch(`http://localhost:8000/api/enroll-status/?course_id=${id}`, {
    credentials: 'include'
  })
    .then(res => {
      if (res.status === 403) {
        // not logged in
        setIsEnrolled(false);
        return;
      }
      return res.json();
    })
    .then(data => {
      if (data) setIsEnrolled(data.enrolled);
    })
    .catch(err => console.error('Error checking enrollment status:', err));
}, [course, id]);


  useEffect(() => {
    fetch(`http://localhost:8000/api/courses/${id}/`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error('Error fetching course:', err));
  }, [id]);

  useEffect(() => {
  if (!course) return;

  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 1); // 1 hour offer

  const updateTimer = () => {
    const now = new Date();
    const diff = endTime - now;

    if (!timerRef.current) return;

    if (diff <= 0) {
      timerRef.current.textContent = 'Offer expired';
      clearInterval(timerId);
      return;
    }

    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    timerRef.current.textContent = `${mins}m ${secs}s`;
  };

  updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [course]);

 async function handleClick() {
  const confirm = await Swal.fire({
    title: "Confirm..?",
    text: "Are you sure you want to purchase this course!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  });

  if (!confirm.isConfirmed) return;

  const csrfToken = Cookies.get('csrftoken');

  const enrollResponse = await fetch("http://localhost:8000/api/enroll/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,  
    },
    credentials: 'include',
    body: JSON.stringify({ course_id: Number(id) })
  });

  const data = await enrollResponse.json();

  if (enrollResponse.ok) {
    Swal.fire("Congratulations...!!", "You purchased this course", "success");
    setIsEnrolled(true);
  } else {
    Swal.fire("Error", data.detail || "Enrollment failed", "error");
  }
}


  if (!course) return <p className="loading">Loading course details...</p>;

  return (
    <>
      <div className="course-detail-container">
  <div className="course-detail-card">
    <div className="course-detail-left">
      <img src={course.image} alt={course.title} className="course-detail-image" />
      
      <div className="course-info-box">
        <h3>What’s Included</h3>
        <ul>
          <li>📜 Certificate on Completion</li>
          <li>🕒 {course.duration_in_months} Month Access</li>
          <li>📚 Downloadable Resources</li>
          <li>🎓 Beginner-Friendly Curriculum</li>
          <li>💬 Community Access & Mentorship</li>
        </ul>
        <div className="course-price">₹{course.cost}</div>
        <div className="offer-timer">
          <span>🔥 Offer ends in:</span>
          <span ref={timerRef}>Loading...</span>
        </div>
        {isEnrolled ? (
          <button className="enroll-button-enrolled" disabled>✅ Enrolled</button>
        ) : (
          <button className="enroll-button" onClick={handleClick}>Enroll Now</button>
        )}
      </div>
    </div>

    <div className="course-detail-content">
      <h2>{course.title}</h2>
      <p className="duration"><strong>Duration:</strong> {course.duration_in_months} months</p>
      <p className="description">{course.description}</p>
      <p className="tools"><strong>Tools Used:</strong> {course.tools_using}</p>

      <div className="course-sections">
        <h4>What You'll Learn</h4>
        <ul>
          <li>Build real-world projects using {course.tools_using}</li>
          <li>Master core concepts of {course.title}</li>
          <li>Understand best practices for real-world development</li>
          <li>Prepare for tech interviews and freelance gigs</li>
        </ul>

        <h4>Who Should Join</h4>
        <ul>
          <li>Students looking to enter the tech industry</li>
          <li>Professionals wanting to upskill</li>
          <li>Freelancers & hobbyists</li>
        </ul>
      </div>
    </div>
  </div>
</div>
<MoreCourses />  
    </>
  );
};

export default CourseDetail;
