import { useState } from 'react'
import { registerUser } from '../api/user.api'
import { useNavigate } from 'react-router-dom'

function UserRegistrationForm() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event : any) => {
        event.preventDefault()
        try {
            console.log("Submitting user registration form...")
            console.log({ userName, userEmail, userPassword })
            registerUser({ username: userName, email: userEmail, password: userPassword }).then(
                //redirect to configuration page
                (response) => {
                    console.log("User registered successfully:", response)
                    navigate("/login")
                }
            )
        }
        catch (error) {
            console.log("Error submitting user registration form", error)
        }
        finally {
            console.log("User registration form submission complete")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h2>Create your user</h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Your username" required onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="name@company.com" required onChange={(e) => setUserEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="••••••••" required onChange={(e) => setUserPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn-login">Create Account</button>
            </form>
        </div>
    )
}

export default UserRegistrationForm