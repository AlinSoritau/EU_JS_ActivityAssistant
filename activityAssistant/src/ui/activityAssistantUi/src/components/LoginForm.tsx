import { useState } from 'react'
import { loginUser } from '../api/auth.api'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event : any) => {
        event.preventDefault()
        localStorage.removeItem("userEmail")
        try {
            console.log("Submitting user login form...")
            await loginUser({ email: email, password: userPassword }).then(
                //redirect to configuration page
                (response) => {
                    console.log("User logged in successfully:", response)
                    navigate("/")
                }
            )
        }
        catch (error : any) {
            console.log("Error submitting user login form", error)
            if (error.status === 401) {
                alert("Invalid email or password. Please try again.")
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
                    <input type="email" id="email" placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
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