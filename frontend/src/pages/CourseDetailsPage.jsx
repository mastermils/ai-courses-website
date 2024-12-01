import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error('Error fetching course details:', error));
  }, [id]);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>{course.title}</h1>
      <p style={{ fontSize: '1.25rem', color: '#555', marginBottom: '1rem' }}>{course.description}</p>
      <p style={{ fontSize: '1.5rem', color: '#333', fontWeight: 'bold' }}>Price: ${course.price}</p>
      <button
        onClick={() => navigate(`/courses/${id}/enroll`)}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Enroll Now
      </button>
    </div>
  );
}

export default CourseDetailsPage;
