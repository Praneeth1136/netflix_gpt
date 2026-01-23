import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { main_LOGO, user_icon } from '../utils/constants'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((store) => store.user)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    // Handle scroll for header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
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

        return () => unSubscribe()
    }, [])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                navigate('/error')
            })
    }

    const isLoginPage = location.pathname === '/'

    return (
        <header
            className={`fixed w-full z-50 transition-colors duration-500 ease-in-out ${
                isScrolled || isLoginPage
                    ? 'bg-[#141414]'
                    : 'bg-gradient-to-b from-black/80 via-transparent to-transparent'
            }`}
        >
            <div className="flex items-center justify-between px-4 md:px-12 py-4">
                {/* Left Section - Logo & Nav */}
                <div className="flex items-center gap-8 lg:gap-12">
                    {/* Netflix Logo */}
                    <Link to={user ? '/browse' : '/'}>
                        <img
                            className="w-24 md:w-32 cursor-pointer hover:scale-105 transition-transform duration-300"
                            src={main_LOGO}
                            alt="Netflix Logo"
                        />
                    </Link>

                    {/* Navigation Links - Only show when logged in */}
                    {user && !isLoginPage && (
                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                to="/browse"
                                className="text-[14px] text-white font-medium cursor-default"
                            >
                                Home
                            </Link>
                            <a
                                href="#"
                                className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
                            >
                                TV Shows
                            </a>
                            <a
                                href="#"
                                className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
                            >
                                Movies
                            </a>
                            <a
                                href="#"
                                className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
                            >
                                New & Popular
                            </a>
                            <a
                                href="#"
                                className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
                            >
                                My List
                            </a>
                        </nav>
                    )}
                </div>

                {/* Right Section - Search, Notifications, User */}
                {user && !isLoginPage && (
                    <div className="flex items-center gap-5">
                        {/* AI Search Button - Styled to fit Netflix theme */}
                        {/* AI Search Button - Vibrant Gradient Pop */}
                        <Link
                            to="/search"
                            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <span className="hidden lg:block text-sm font-bold text-white tracking-wide">
                                AI Search
                            </span>
                        </Link>

                        {/* Notification Bell */}
                        <button className="text-white hover:text-gray-300 transition-colors cursor-pointer">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M13 2.05v-.05a1 1 0 1 0-2 0v.05a8.003 8.003 0 0 0-7 8v5.586l-1.707 1.707a1 1 0 0 0 .707 1.707h18a1 1 0 0 0 .707-1.707l-1.707-1.707V10.05a8.003 8.003 0 0 0-7-8M6 10.05a6 6 0 1 1 12 0v6.293l.293.293H5.707l.293-.293V10.05M12 21.5a3.003 3.003 0 0 0 2.83-2h-5.66a3.003 3.003 0 0 0 2.83 2" />
                            </svg>
                        </button>

                        {/* Profile Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div className="flex items-center gap-1 cursor-pointer">
                                <img
                                    className="w-8 h-8 rounded"
                                    src={user_icon}
                                    alt="User icon"
                                />
                                <svg
                                    className={`w-4 h-4 text-white transition-transform duration-300 ${
                                        showDropdown ? 'rotate-180' : ''
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7 10l5 5 5-5z" />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute right-0 top-full mt-2 w-52 bg-black/90 border border-gray-700 rounded-sm shadow-2xl transition-all duration-200 origin-top-right ${
                                    showDropdown
                                        ? 'opacity-100 visible scale-100'
                                        : 'opacity-0 invisible scale-95'
                                }`}
                            >
                                {/* Arrow pointing up */}
                                <div className="absolute -top-2 right-5 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-700"></div>
                                <div className="absolute -top-[7px] right-5 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-black/90"></div>

                                <div className="py-2 flex flex-col">
                                    {/* Profiles Section */}
                                    <div className="px-3 py-2 flex items-center gap-3 hover:bg-gray-800/50 cursor-pointer transition-colors group/profile">
                                        <img
                                            className="w-8 h-8 rounded-sm"
                                            src={user_icon}
                                            alt="Profile"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] text-white group-hover/profile:underline leading-none mb-1">
                                                {user.displayName || 'User'}
                                            </span>
                                            <span className="text-[11px] text-gray-400 font-normal leading-none">
                                                Manage Profiles
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-3 py-2 text-[13px] text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer transition-colors">
                                        Transfer Profile
                                    </div>
                                    <div className="px-3 py-2 text-[13px] text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer transition-colors">
                                        Account
                                    </div>
                                    <div className="px-3 py-2 text-[13px] text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer transition-colors">
                                        Help Center
                                    </div>

                                    <div className="border-t border-gray-700 my-1"></div>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-center px-3 py-2.5 text-[13px] text-white hover:underline cursor-pointer transition-colors"
                                    >
                                        Sign out of Netflix
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
