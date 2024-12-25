import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import { BrowserRouter , Link, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'
import Nav from './Nav'
import Display from './display'
import ForgetPassword from './ForgetPassword'
import Table from './Table'

function App() {
  
const [click,setClick]=useState(false)
  return (
    <>
      <BrowserRouter>
    <Nav click={click} setClick={setClick} />
     
<Routes>
  <Route path='/signup' element={<Signup/>}></Route>
  <Route path='/login' element={<LoginPage setClick={setClick}/>}></Route>
 <Route path='/display' element={< Display/>}></Route>
 <Route path='/forgotpassword' element={< ForgetPassword/>}></Route>
 <Route path='/table' element={< Table/>}></Route>
</Routes>
 
      
      
      
       </BrowserRouter>
    </>
  )
}

export default App
