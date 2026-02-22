import { useState } from 'react'
import { loginUser } from '../api/auth.api'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
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
        <form onSubmit={handleSubmit} >
            <h3 style={{color: "blue"}}>Create your user</h3>
            <table>
                <tr>
                    <td>
                        <text>User name:</text>
                    </td>
                    <td>
                        <input type="text" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <text>Password:</text>
                    </td>
                    <td>
                        <input type="password" name="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit">Login</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onClick={() => navigate("/register")}>Register</button>
                    </td>
                </tr>
            </table>
        </form>
        </div>
    )
}

export default LoginForm