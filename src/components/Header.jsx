import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { addUser, removeUser } from '../utils/userSlice'
import { main_LOGO } from '../utils/constants'
import { user_icon } from '../utils/constants'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const user = useSelector((store) => store.user)

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out')
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
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
                dispatch(removeUser())
                navigate('/')
            }
        })

        // Unsiubscribe when component unmounts
        return () => unsubscribe()
    }, [])
    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-44" src={main_LOGO} alt="logo" />

            {user && location.pathname !== '/' && (
                <div className="flex p-2">
                    <img className="w-12 h-12" src={user_icon} alt="usericon" />
                    <button
                        onClick={handleSignOut}
                        className="font-bold text-white px-2 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-all duration-200"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header
