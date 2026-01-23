// import { signOut } from 'firebase/auth'
// import { auth } from '../utils/firebase'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { onAuthStateChanged } from 'firebase/auth'
// import { useEffect } from 'react'
// import { addUser, removeUser } from '../utils/userSlice'
// import { main_LOGO } from '../utils/constants'
// import { user_icon } from '../utils/constants'

// const Header = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate();
//     const location = useLocation()
//     const user = useSelector((store) => store.user)

//     const handleSignOut = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log('User signed out')
//                 navigate('/')
//             })
//             .catch((error) => {
//                 console.log(error)
//                 navigate('/error')
//             })
//     }
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 const { uid, email, displayName, photoURL } = user
//                 dispatch(
//                     addUser({
//                         uid: uid,
//                         email: email,
//                         displayName: displayName,
//                         photoURL: photoURL,
//                     })
//                 )
//                 navigate('/browse')
//             } else {
//                 dispatch(removeUser())
//                 navigate('/')
//             }
//         })

//         // Unsiubscribe when component unmounts
//         return () => unsubscribe()
//     }, [])
//     return (
//         <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
//             <img className="w-44" src={main_LOGO} alt="logo" />

//             {user && location.pathname !== '/' && (
//                 <div className="flex p-2">
//                     <img className="w-12 h-12" src={user_icon} alt="usericon" />
//                     <button
//                         onClick={handleSignOut}
//                         className="font-bold text-white px-2 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-all duration-200"
//                     >
//                         Sign Out
//                     </button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Header
import { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { main_LOGO } from '../utils/constants'
import { user_icon } from '../utils/constants'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((store) => store.user)
    const gpt = useSelector((store) => store.gptMovies.gptResMovies)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const { uid, email, displayName, photoURL } = user
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                )
                navigate('/browse')
            } else {
                // User is signed out
                dispatch(removeUser())
                navigate('/')
            }
        })

        return () => unSubscribe()
    }, [])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                navigate('/error')
            })
    }

    return (
        <div className="fixed w-full px-4 md:px-12 py-4 z-50 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center">
            <div className="flex items-center gap-8">
                <img
                    className="w-24 md:w-32 cursor-pointer"
                    src={main_LOGO}
                    alt="Netflix Logo"
                />
                {/* {user && (
          <nav className="hidden md:flex gap-5 text-sm text-white">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-300 transition">Popular</a>
            <a href="#" className="hover:text-gray-300 transition">Movies</a>
            <a href="#" className="hover:text-gray-300 transition">New & Popular</a>
            <a href="#" className="hover:text-gray-300 transition">My List</a>
          </nav>
        )} */}
            </div>

            {user && (
                <div className="flex items-center gap-4">
                    <Link
                        to="/search"
                        className="text-white px-4 py-1.5 flex items-center gap-1 text-sm rounded-md border border-red-600 bg-transparent hover:bg-red-600 active:bg-red-700 cursor-pointer transition-colors duration-300"
                    >
                        AI SEARCH
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </Link>

                    <img
                        className="w-8 h-8 rounded cursor-pointer"
                        src={user_icon}
                        alt="User icon"
                    />
                    <button
                        onClick={handleSignOut}
                        className="hidden md:block bg-red-600 text-white px-4 py-1.5 text-sm rounded hover:bg-red-700 cursor-pointer transition"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header
