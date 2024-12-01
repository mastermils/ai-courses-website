import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import EnrollPage from './pages/EnrollPage';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/courses/:id' element={<CourseDetailsPage />} />
          <Route path='/courses/:id/enroll' element={<EnrollPage />} />
          <Route path='/enrolled' element={<EnrolledCoursesPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
