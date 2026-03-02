import { useState } from 'react'

function ProfileConfigurationForm() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        try {
            console.log("Submitting user configuration form...")
            console.log({ userName, userEmail, userPassword })
        }
        catch (error) {
            console.log("Error submitting user configuration form", error)
        }
        finally {
            console.log("User configuration form submission complete")
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h3 style={{color: "blue"}}>Configure your profile</h3>
        </form>
        </div>
    )
}

export default ProfileConfigurationForm