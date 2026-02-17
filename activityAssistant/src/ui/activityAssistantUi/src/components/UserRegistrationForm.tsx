import { useState } from 'react'
import { registerUser } from '../api/userManagement.api'
import { useNavigate } from 'react-router-dom'

function UserRegistrationForm() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
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
                        <text>Email:</text>
                    </td>
                    <td>
                        <input type="text" name="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
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
                        <button type="submit">Create account</button>
                    </td>
                </tr>
            </table>
        </form>
        </div>
    )
}

export default UserRegistrationForm