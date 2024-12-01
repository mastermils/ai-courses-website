import React, { useEffect, useState } from 'react';

function EnrolledCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

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

  return (
    <div>
      <h1>Enrolled Courses</h1>
      {enrolledCourses.length === 0 ? (
        <p>You have no enrolled courses.</p>
      ) : (
        enrolledCourses.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default EnrolledCoursesPage;
