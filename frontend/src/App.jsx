import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';
import EnrollPage from './pages/EnrollPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/enrolled" element={<EnrolledCoursesPage />} />
        <Route path="/enroll/:id" element={<EnrollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
