import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/courses/")
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <section className="courses-section" id="courses-section">
      <h2>Our Courses</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          0:   { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024:{ slidesPerView: 3 },
        }}
      >
        {courses.map((c, i) => (
          <SwiperSlide key={i}>
            <div className="course-tile">
              {c.image && (
                <div className="course-image">
                  <img src={c.image} alt={c.title} />
                </div>
              )}
              <div className="course-info">
                <h3>{c.title}</h3>
                <p><strong>Duration:</strong> {c.duration} months</p>
                <p>{c.description}</p>
                <p><strong>Tools:</strong> {c.tools}</p>
                <a href="/login" className="course-btn">Enroll Now</a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
