import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ _id, title, description, price }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <Link to={`/courses/${_id}`} style={{ textDecoration: 'none', color: '#fff' }}>
        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          View Details
        </button>
      </Link>
    </div>
  );
}

export default CourseCard;
