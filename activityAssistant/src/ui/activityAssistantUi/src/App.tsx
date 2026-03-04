import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProfileConfigurationPage from './pages/ProfileConfigurationPage'
import UserRegistrationPage from './pages/UserRegistrationPage'
import LoginPage from './pages/LoginPage'
import UserDashboardPage from './pages/UserDashboardPage'
import AiConversationListPage from './pages/AiConversationListPage'
import ProtectedRoute from './components/ProtectedRoute'
import AiMessagingPage from './pages/AiMessagingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
        <Route path="/ai-assistant" element={<ProtectedRoute><AiConversationListPage /></ProtectedRoute>} />
        <Route path="/ai-messaging" element={<ProtectedRoute><AiMessagingPage/></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="/configuration" element={<ProtectedRoute><ProfileConfigurationPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App