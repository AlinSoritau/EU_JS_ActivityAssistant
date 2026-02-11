import './App.css'
import ProfileConfigurationPage from './pages/ProfileConfigurationPage'
import UserRegistrationPage from './pages/UserRegistrationPage'
import { Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    
<div>
      <nav>
        <Link to="/">UserRegistrationPage</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserRegistrationPage />} />
        <Route path="/configuration" element={<ProfileConfigurationPage />} />
      </Routes>
    </div>

  )
}

export default App