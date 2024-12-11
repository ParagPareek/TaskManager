import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <>
      
     
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Task Manager</h1>
        </div>
        <div className="navbar-right">
          <button className="auth-btn">Login</button>
          <button className="auth-btn">Sign Up</button>
        </div>
      </nav>

   
       <Signup />
      
      

    </>
  )
}

export default App
