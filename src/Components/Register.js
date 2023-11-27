import "../Css/Register.css"
import { useState } from "react"

const Register = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <>
        <div id="main-register-container">
            <form id="register-form" className="flex-column center">
                {!isLogin && <input placeholder="first name"></input>}
                {!isLogin && <input placeholder="last name"></input>}
                <input placeholder="email"></input>
                <input placeholder="password"></input>
                {!isLogin &&<input placeholder="company"></input>}
                {isLogin ? <p>Don't have an account yet? <span>signup here</span></p> : <p>Already have an account? <span>login here</span></p>}
                <button>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Register