import { useState } from 'react'

function ProfileConfigurationForm() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            console.log("Submitting user registration form...")
            console.log({ userName, userEmail, userPassword })
        }
        catch {
            console.log("Error submitting user registration form")
        }
        finally {
            console.log("User registration form submission complete")
        }
    }

    return (
        <div>
        <form>
            <h3 style={{color: "blue"}}>Configure your profile</h3>
        </form>
        </div>
    )
}

export default ProfileConfigurationForm