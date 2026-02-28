import UserRegistrationForm from "../components/UserRegistrationForm"

const createUser = async () => {
    console.log("Configuring user settings...")
}

function UserRegistrationPage() {
    return<div>
            <h2>User Registration</h2>
            <UserRegistrationForm onSubmit={createUser}/>
            <a href="/login">Already have an account? Log in here.</a>
        </div>
}

export default UserRegistrationPage