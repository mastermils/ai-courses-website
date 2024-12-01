import React, { useEffect, useState } from 'react';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch authenticated user details
    fetch('http://localhost:5000/api/protected', {
      credentials: 'include', // Include cookies for the session
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not authenticated');
      })
      .then((data) => {
        console.log('User data:', data);
        setUser(data.user);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
  }, []);

  const login = () => {
    window.location.href = 'http://localhost:5000/auth/login';
  };

  const logout = () => {
    window.location.href = 'http://localhost:5000/auth/logout';
  };

  return (
    <header
      style={{
        padding: '1rem',
        background: '#333',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h1 style={{ margin: 0 }}>Courses Administration</h1>
      <nav>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Welcome, {user.name.givenName}</span>
            <button
              onClick={logout}
              style={{
                marginRight: '1rem',
                padding: '0.5rem',
                background: '#f44336',
                color: '#fff',
                border: 'none',
              }}
            >
              Logout
            </button>
            <a href="/" style={{ marginRight: '1rem', color: '#fff' }}>
              Home
            </a>
            <a href="/courses" style={{ marginRight: '1rem', color: '#fff' }}>
              Courses Admin
            </a>
            <a href="/enrolled" style={{ color: '#fff' }}>
              Enrolled Courses
            </a>
          </>
        ) : (
          <button
            onClick={login}
            style={{
              padding: '0.5rem',
              background: '#4caf50',
              color: '#fff',
              border: 'none',
            }}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
