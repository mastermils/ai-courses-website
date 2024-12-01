import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EnrollPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        setIsEnrolled(true);
        setTimeout(() => navigate('/courses'), 3000);
      })
      .catch((error) => console.error('Error enrolling:', error));
  };

  if (isEnrolled) {
    return <p>Thank you for enrolling! Redirecting to courses...</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Enroll in Course</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Enroll Now
        </button>
      </form>
    </div>
  );
}

export default EnrollPage;
