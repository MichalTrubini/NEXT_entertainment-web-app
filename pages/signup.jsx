import LoginTemplate from "../src/shared/components/login/loginTemplate";

const Signup = () => {
    return (
        <LoginTemplate 
        title='Sign Up'
        buttonText='Create an account'
        message="Already have an account?"
        link='/login'
        action='Login'
        />
    )
}

export default Signup;