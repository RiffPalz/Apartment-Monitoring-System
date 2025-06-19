import './App.css'
import {Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import CreateAcc from './pages/CreateAcc.jsx'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        
      </Routes>
    </>
  )
}

export default App
