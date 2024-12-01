import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: 'linear-gradient(to right, #f7f8fc, #e6ebf5)', padding: '2rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>Welcome to AI Courses</h1>
        <p style={{ fontSize: '1.25rem', color: '#555', marginBottom: '1.5rem' }}>
          Explore our curated list of courses to master the world of Artificial Intelligence.
        </p>
        <button 
          onClick={() => navigate('/courses')} 
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Get Started
        </button>
      </section>

      {/* Courses Introduction */}
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.25rem', color: '#444' }}>
          Our courses are designed to provide hands-on experience and practical knowledge to help you excel in the field of Artificial Intelligence. Whether you're a beginner or a professional, our diverse range of courses caters to all skill levels.
        </p>
      </section>

      {/* Courses Grid */}
      <section>
        <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '1.5rem' }}>Our Courses</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {courses.map((course) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
