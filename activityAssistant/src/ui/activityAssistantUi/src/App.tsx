import './App.css'
import ProfileConfigurationPage from './pages/ProfileConfigurationPage'
import UserRegistrationPage from './pages/UserRegistrationPage'
import LoginPage from './pages/LoginPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/configuration" element={<ProfileConfigurationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App