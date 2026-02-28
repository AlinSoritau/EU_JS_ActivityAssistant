import LoginForm from "../components/LoginForm"

function LoginPage() {
       return <div className="login-card">
            <h2>Welcome Back</h2>
            <LoginForm onSubmit={console.log("Form submitted with data:")}/>

            <div className="footer-links">
                <a href="#">Forgot Password?</a>
                <span>|</span>
                <a href="/register">Create Account</a>
            </div>
        </div>
}

export default LoginPage