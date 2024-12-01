import React, { useEffect, useState } from 'react';

function EnrolledCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/enrollments')
      .then((response) => response.json())
      .then((data) => setEnrolledCourses(data))
      .catch((error) => console.error('Error fetching enrolled courses:', error));
  }, []);

  if (enrolledCourses.length === 0) {
    return <p>No courses enrolled yet.</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Enrolled Courses</h1>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course._id} style={{ marginBottom: '1rem' }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnrolledCoursesPage;
