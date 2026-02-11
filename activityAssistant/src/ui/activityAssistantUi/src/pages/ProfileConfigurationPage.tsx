import ProfileConfigurationForm from "../components/ProfileConfigurationForm"

function ProfileConfigurationPage() {
    return <div>
            <h1>Dashboard</h1>
            <p>Un tablou de bord</p>

            {
                [
                    <ProfileConfigurationForm />
                ]
            }

        </div>
}

export default ProfileConfigurationPage