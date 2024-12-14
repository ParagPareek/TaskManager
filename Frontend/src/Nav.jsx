import React, { useState } from 'react'
import './App.css'
import {Link, useNavigate } from 'react-router-dom';
const Nav = ({click , setClick}) => {
    
    const [login , setLogin]=useState( localStorage.getItem('token')||null)
const handlechange=()=>{
    localStorage.removeItem('token')
    setLogin(null)
    setClick(false);
}
  return (
    <nav className="navbar">
    <div className="navbar-left">
      <h1>Task Manager</h1>
    </div>
    <div className="navbar-right">
        {login || click ?(
            <Link to={"/login"}><button className="auth-btn" onClick={handlechange}>Logout</button></Link>

        ):(<>
             <Link to={"/login"}><button className="auth-btn">Login</button></Link>
    
      <Link to={"/signup"}> <button className="auth-btn">Sign Up</button></Link> 
       
      </> )
       
        }
    
     
    </div>
  </nav>
  )
}

export default Nav