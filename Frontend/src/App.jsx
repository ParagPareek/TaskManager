import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import { BrowserRouter , Link, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'

function App() {
  

  return (
    <>
      <BrowserRouter>
    
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Task Manager</h1>
        </div>
        <div className="navbar-right">
          <Link to={"/home"}><button className="auth-btn">home</button></Link>
        
          <Link to={"/login"}><button className="auth-btn">Login</button></Link>
        
          <Link to="/signup"> <button className="auth-btn">Sign Up</button></Link> 
        </div>
      </nav>
<Routes>
  <Route path='/signup' element={<Signup/>}></Route>
  <Route path='/login' element={<LoginPage/>}></Route>
</Routes>
 
      
      
      
       </BrowserRouter>
    </>
  )
}

export default App
