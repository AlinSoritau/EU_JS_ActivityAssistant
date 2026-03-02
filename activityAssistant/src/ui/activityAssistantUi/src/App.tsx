import './App.css'
import ProfileConfigurationPage from './pages/ProfileConfigurationPage'
import UserRegistrationPage from './pages/UserRegistrationPage'
import LoginPage from './pages/LoginPage'
import UserDashboardPage from './pages/UserDashboardPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/configuration" element={<ProtectedRoute><ProfileConfigurationPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App