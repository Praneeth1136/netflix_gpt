import { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { login_wallpaper, user_icon } from '../utils/constants'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const handleButtonClick = () => {
        const message = checkValidData(
            email.current.value,
            password.current.value
        )
        setErrorMessage(message)
        if (message) return

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: user_icon,
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } =
                                auth.currentUser
                        })
                        .catch((error) => {
                            setErrorMessage(error.message)
                        })
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    setErrorMessage(errorCode + '-' + errorMessage)
                })
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    setErrorMessage(errorCode + '-' + errorMessage)
                })
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Header />

            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
                <img
                    src={login_wallpaper}
                    alt="netflix background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Login Form Container */}
            <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-10">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                        width: '100%',
                        maxWidth: '450px',
                        height: '580px',
                        padding: '70px 80px',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        borderRadius: '4px',
                        opacity: '0.8',
                    }}
                >
                    {/* Sign In / Sign Up Title */}
                    <h1
                        style={{
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '28px',
                        }}
                    >
                        {isSignInForm ? 'Sign In' : 'Sign Up'}
                    </h1>

                    {/* Name Input - Only for Sign Up */}
                    {!isSignInForm && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Full Name"
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                marginBottom: '16px',
                                backgroundColor: '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                            }}
                        />
                    )}

                    {/* Email Input */}
                    <input
                        ref={email}
                        type="text"
                        placeholder="Email address"
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            marginBottom: '16px',
                            backgroundColor: '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                        }}
                    />

                    {/* Password Input */}
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            marginBottom: '16px',
                            backgroundColor: '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                        }}
                    />

                    {/* Error Message */}
                    {errorMessage && (
                        <p
                            style={{
                                color: '#E87C03',
                                fontSize: '14px',
                                marginBottom: '16px',
                            }}
                        >
                            {errorMessage}
                        </p>
                    )}

                    {/* Sign In / Sign Up Button */}
                    <button
                        onClick={handleButtonClick}
                        style={{
                            width: '100%',
                            padding: '16px',
                            marginTop: '24px',
                            marginBottom: '12px',
                            backgroundColor: '#E50914',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {isSignInForm ? 'Sign In' : 'Sign Up'}
                    </button>

                    {/* Sign Up / Sign In Toggle */}
                    <div style={{ marginTop: '16px' }}>
                        <span style={{ color: '#737373' }}>
                            {isSignInForm
                                ? 'New to Netflix? '
                                : 'Already have an account? '}
                        </span>
                        <span
                            onClick={toggleSignInForm}
                            style={{
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: '500',
                            }}
                        >
                            {isSignInForm ? 'Sign up now.' : 'Sign in now.'}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
