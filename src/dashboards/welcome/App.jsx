import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import VoyagerLoginPage from './pages/VoyagerLoginPage'
import CrewLoginPage from './pages/CrewLoginPage'
import './index.css'

function WelcomeApp() {
  return (
    <div className="welcome-container">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login/voyager" element={<VoyagerLoginPage />} />
        <Route path="/login/crew" element={<CrewLoginPage />} />
      </Routes>
    </div>
  )
}

export default WelcomeApp