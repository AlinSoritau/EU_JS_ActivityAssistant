import { useState } from 'react'
import { loginUser } from '../api/auth.api'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event : any) => {
        event.preventDefault()
        try {
            console.log("Submitting user login form...")
            await loginUser({ username: userName, password: userPassword }).then(
                //redirect to configuration page
                (response) => {
                    console.log("User logged in successfully:", response)
                    navigate("/configuration")
                }
            )
        }
        catch (error : any) {
            console.log("Error submitting user login form", error)
            if (error.status === 401) {
                alert("Invalid username or password. Please try again.")
            }
            else {
                alert(`Login Error: ${error?.message}`)
            }
        }
        finally {
            console.log("User login form submission complete")
        }
    }

    return (
        <div>
            <form action="#" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" placeholder="name@company.com" required onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="••••••••" required onChange={(e) => setUserPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn-login">Sign In</button>
            </form>
        </div>
    )
}

export default LoginForm