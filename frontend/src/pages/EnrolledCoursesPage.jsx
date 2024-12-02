import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnrolledCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/enrollments', {
      credentials: 'include', // Include cookies for the session
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch enrollments');
      })
      .then((data) => {
        setEnrolledCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching enrolled courses:', error);
      });
  }, []);

  const handleOpenCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Enrolled Courses</h1>
      {enrolledCourses.length === 0 ? (
        <p>You have no enrolled courses.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
              }}
            >
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ${course.price}</p>
              <button
                onClick={() => handleOpenCourse(course.id)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Open Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCoursesPage;
