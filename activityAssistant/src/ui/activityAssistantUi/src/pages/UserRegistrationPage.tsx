import UserRegistrationForm from "../components/UserRegistrationForm"

const createUser = async () => {
    console.log("Configuring user settings...")
}

function UserRegistrationPage() {
    return <div>
            <h1>Dashboard</h1>
            <p>Un tablou de bord</p>

            {
                [
                    <UserRegistrationForm onSubmit={createUser}/>
                ]
            }

        </div>
}

export default UserRegistrationPage