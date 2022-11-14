import React, { useRef} from 'react'
import { auth } from '../firebase'
import './SignUpScreen.css'
import { useNavigate } from 'react-router-dom'

function SignUpScreen() {
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        )
        .then((authUser) => {
            navigate('/homescreen')
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    const signIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
            navigate('/homescreen')
        })
        .catch((error) => alert(error.message))
    }

  return (
    <div className='signupScreen'>
        <form>
            <h1>Sign In</h1>
            <input ref={emailRef} type="email" placeholder='Email' />
            <input ref={passwordRef} type="password" placeholder='Password' />
            <button type='submit' onClick={signIn}>Sign In</button>

            <h4>
                <span className='signupScreen__gray'>New to Netflix? </span>
                <span className="signupScreen__link" onClick={register} title='Please enter 6 digit password to login'>Sign Up now.</span><br />
                <span className='signupScreen__red' title='Please enter 6 digit password to login'>(To test the application, Please enter a basic password like (123456)* and click on Sign Up.)</span>
            </h4>
        </form>
    </div>
  )
}

export default SignUpScreen