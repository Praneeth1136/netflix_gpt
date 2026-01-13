import Header from "./Header";
import {useState} from "react";

const Login = () =>{
    const[isSignInForm,setisSignInForm] = useState(true);


    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm);
    }

    return(
        <>
        <div>
            <Header/>
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/e393bb3f-261f-43d1-99bb-16a157885615/web/IN-en-20260105-TRIFECTA-perspective_2802b120-4b8c-44a5-8fb9-617a728f4ec6_large.jpg" alt="netflix"/>
            </div>
            <form className="w-3/12 p-12 absolute bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg">
                <h1 className="text-3xl font-bold">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (<input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>)}
                <input type="Email" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
                <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700"/> 
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New User-Sign Up" : "Already a User-Sign In"} </p>
            </form>
        </div>
        </> 
    )
}

export default Login;