import { useEffect, useState } from 'react'
import { getUserData } from '../api/user.api';

function UserDashboardPage() {
    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail')
                if (userEmail) {
                    const userData = await getUserData(userEmail)
                    setUsername(userData.username)
                    localStorage.setItem('userId', userData.userId?.toString() || '')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchUserData()
    }, [])

    return <div>
        <h1>Welcome back, {username}!</h1>
            <div>
                <p>What would you like to do today?</p>
                < input type="button" value="Configure my profile" className="btn-generic" onClick={() => window.location.href = "/configuration"} />
                < input type="button" value="Message the AI Assistant" className="btn-generic" onClick={() => window.location.href = "/ai-assistant"} />
            </div>

            <input type="button" value="Logout" className="btn-logout" onClick={() => {                
                window.location.href = "/login"
            }} />
    </div>
}

export default UserDashboardPage