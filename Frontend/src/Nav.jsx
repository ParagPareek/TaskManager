import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Nav = ({ click, setClick }) => {
  const [login, setLogin] = useState(localStorage.getItem('token') || null);

  const handleChange = () => {
    localStorage.removeItem('token');
    setLogin(null);
    setClick(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Task Manager</h1>
        <div className="navbar-links">
          {login || click ? (
            <>
              <Link to="/display" className="auth-btn">Board</Link>
              <Link to="/table" className="auth-btn">Table</Link>
            </>
          ) : (
            <>
              {/* Links will not be shown if user is not logged in */}
            </>
          )}
        </div>
      </div>
      <div className="navbar-right">
        {login || click ? (
          <Link to="/login">
            <button className="auth-btn" onClick={handleChange}>Logout</button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="auth-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="auth-btn">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
