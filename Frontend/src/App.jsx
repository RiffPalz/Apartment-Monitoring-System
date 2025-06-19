import './App.css'
import {Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import CreateAcc from './pages/CreateAcc.jsx'
import Landingpages from './pages/Landingpage/Landingpage.jsx'
import Applypage from "./pages/Landingpage/Applynow.jsx";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpages />} />
        <Route path="/applynowpage" element={<Applypage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        
      </Routes>
    </>
  )
}

export default App
