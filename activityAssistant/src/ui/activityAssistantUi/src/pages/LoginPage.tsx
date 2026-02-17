import LoginForm from "../components/LoginForm"

function LoginPage() {
    return <div>
            <h1>Login</h1>

            {
                [
                    <LoginForm onSubmit={console.log("Form submitted with data:")}/>
                ]
            }

        </div>
}

export default LoginPage