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
        <div className="min-h-screen relative">
            <Header />

            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={login_wallpaper}
                    alt="netflix background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Login Form */}
            <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-20">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full max-w-md bg-black/75 rounded-md p-14 backdrop-blur-sm"
                >
                    <h1 className="font-bold text-3xl text-white mb-7">
                        {isSignInForm ? 'Sign In' : 'Sign Up'}
                    </h1>

                    {!isSignInForm && (
                        <div className="mb-4">
                            <input
                                ref={name}
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-5 py-4 bg-[#333] text-white rounded border border-[#333] focus:border-white/50 transition-colors placeholder-gray-400"
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <input
                            ref={email}
                            type="text"
                            placeholder="Email or mobile number"
                            className="w-full px-5 py-4 bg-[#333] text-white rounded border border-[#333] focus:border-white/50 transition-colors placeholder-gray-400"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            ref={password}
                            type="password"
                            placeholder="Password"
                            className="w-full px-5 py-4 bg-[#333] text-white rounded border border-[#333] focus:border-white/50 transition-colors placeholder-gray-400"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-[#E87C03] text-sm mb-4 bg-[#E87C03]/10 p-3 rounded">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        className="w-full py-3 mt-4 bg-[#E50914] text-white font-semibold rounded hover:bg-[#F40612] transition-colors cursor-pointer"
                        onClick={handleButtonClick}
                    >
                        {isSignInForm ? 'Sign In' : 'Sign Up'}
                    </button>

                    {isSignInForm && (
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-[#E50914]"
                                />
                                Remember me
                            </label>
                            <a href="#" className="hover:underline">
                                Need help?
                            </a>
                        </div>
                    )}

                    <div className="mt-12">
                        <p className="text-gray-400">
                            {isSignInForm
                                ? 'New to Netflix? '
                                : 'Already have an account? '}
                            <span
                                className="text-white font-medium cursor-pointer hover:underline"
                                onClick={toggleSignInForm}
                            >
                                {isSignInForm ? 'Sign up now' : 'Sign in now'}
                            </span>
                        </p>
                    </div>

                    <p className="mt-4 text-xs text-gray-500">
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot.{' '}
                        <a href="#" className="text-blue-500 hover:underline">
                            Learn more.
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
