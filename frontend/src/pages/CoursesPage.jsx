import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({ title: '', description: '', price: '' });
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    fetch('http://localhost:5000/api/courses', { method: 'DELETE' })
      .then(() => {
        setCourses(courses.filter((course) => course._id !== id));
        setNotification('Course deleted successfully!');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
        setNotification('Failed to delete course.');
        setLoading(false);
      });
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setUpdatedCourse({ title: course.title, description: course.description, price: course.price });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse._id) {
      console.error("Course ID is missing");
      setNotification("Course ID is missing. Unable to update.");
      return;
    }
    console.log("Updating course with ID:", editingCourse._id);
    setLoading(true);
    fetch(`http://localhost:5000/api/courses/${editingCourse._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCourse),
    })
      .then((response) => response.json())
      .then((updated) => {
        setCourses(courses.map((course) => (course._id === updated._id ? updated : course)));
        setEditingCourse(null);
        setNotification("Course updated successfully!");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        setNotification("Failed to update course.");
        setLoading(false);
      });
  };  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description || !newCourse.price) {
      setNotification('All fields are required to add a course.');
      return;
    }
    setLoading(true);
    fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    })
      .then((response) => response.json())
      .then((course) => {
        setCourses([...courses, course]);
        setNewCourse({ title: '', description: '', price: '' });
        setNotification('Course added successfully!');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error creating course:', error);
        setNotification('Failed to add course.');
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {notification && <p>{notification}</p>}
      <h1>Courses Administration</h1>
      {courses.map((course) => (
        <div key={course._id}>
          <CourseCard {...course} />
          <button onClick={() => handleEdit(course)}>Edit</button>
          <button onClick={() => handleDelete(course._id)}>Delete</button>
        </div>
      ))}

      {editingCourse && (
        <div>
          <h2>Edit Course</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Title: </label>
              <input
                type='text'
                name='title'
                value={updatedCourse.title}
                onChange={(e) => setUpdatedCourse({ ...updatedCourse, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Description: </label>
              <textarea
                name='description'
                value={updatedCourse.description}
                onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Price: </label>
              <input
                type='number'
                name='price'
                value={updatedCourse.price}
                onChange={(e) => setUpdatedCourse({ ...updatedCourse, price: e.target.value })}
                required
              />
            </div>
            <button type='submit'>Update Course</button>
            <button type='button' onClick={() => setEditingCourse(null)}>Cancel</button>
          </form>
        </div>
      )}

      <h2>Add a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type='text'
            name='title'
            value={newCourse.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            name='description'
            value={newCourse.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type='number'
            name='price'
            value={newCourse.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type='submit'>Add Course</button>
      </form>
    </div>
  );
}

export default CoursesPage;
