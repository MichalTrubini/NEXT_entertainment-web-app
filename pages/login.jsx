import LoginTemplate from "../src/shared/components/login/loginTemplate";

const Login = () => {
    return (
        <LoginTemplate 
        title='Login'
        buttonText='Login to your account'
        message="Don't have an account?"
        link='/signup'
        action='Sign up'
        />
    )
}

export default Login;