import Header from './Header'
import { useState,useRef } from 'react';
import {checkValidData} from "../utils/validate";

const Login = () => {
    const [isSignInForm, setisSignInForm] = useState(true);

    const [errorMessage,seterrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        //Validate dta untadhi
        console.log(email.current.value);
        console.log(password.current.value);

        const message = checkValidData(email.current.value, password.current.value);
        console.log(message);
        seterrorMessage(message);

    }

    return (
        <>
            <div>
                <Header />
                <div className="absolute">
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/e393bb3f-261f-43d1-99bb-16a157885615/web/IN-en-20260105-TRIFECTA-perspective_2802b120-4b8c-44a5-8fb9-617a728f4ec6_large.jpg"
                        alt="netflix"
                    />
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="w-3/12 p-12 absolute bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg">
                    <h1 className="text-3xl font-bold">
                        {isSignInForm ? 'Sign In' : 'Sign Up'}
                    </h1>
                    {!isSignInForm && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="p-4 my-4 w-full bg-gray-700"
                        />
                    )}
                    <input
                        ref = {email}
                        type="Email"
                        placeholder="Email Address"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                    <input
                        ref = {password}
                        type="password"
                        placeholder="Password"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                    <p className="text-red-500">{errorMessage}</p>
                    <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
                        {isSignInForm ? 'Sign In' : 'Sign Up'}
                    </button>
                    <p
                        className="py-4 cursor-pointer"
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm
                            ? 'New User-Sign Up'
                            : 'Already a User-Sign In'}{' '}
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login
