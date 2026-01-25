// import { useEffect, useState } from 'react'
// import { onAuthStateChanged, signOut } from 'firebase/auth'
// import { auth } from '../utils/firebase'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { addUser, removeUser } from '../utils/userSlice'
// import { main_LOGO, user_icon } from '../utils/constants'

// const Header = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const location = useLocation()
//     const user = useSelector((store) => store.user)
//     const [isScrolled, setIsScrolled] = useState(false)
//     const [showDropdown, setShowDropdown] = useState(false)

//     // Handle scroll for header background
//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50)
//         }
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     useEffect(() => {
//         const unSubscribe = onAuthStateChanged(auth, (user) => {
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

//         return () => unSubscribe()
//     }, [])

//     const handleSignOut = () => {
//         signOut(auth)
//             .then(() => {})
//             .catch((error) => {
//                 navigate('/error')
//             })
//     }

//     const isLoginPage = location.pathname === '/'

//     return (
//         <header
//             className={`fixed w-full z-50 transition-colors duration-500 ease-in-out ${
//                 isScrolled || isLoginPage
//                     ? 'bg-[#141414]'
//                     : 'bg-gradient-to-b from-black/80 via-transparent to-transparent'
//             }`}
//         >
//             <div className="flex items-center justify-between px-4 md:px-12 py-4">
//                 {/* Left Section - Logo & Nav */}
//                 <div className="flex items-center gap-8 lg:gap-12">
//                     {/* Netflix Logo */}
//                     <Link to={user ? '/browse' : '/'}>
//                         <img
//                             className="w-24 md:w-32 cursor-pointer hover:scale-105 transition-transform duration-300"
//                             src={main_LOGO}
//                             alt="Netflix Logo"
//                         />
//                     </Link>

//                     {/* Navigation Links - Only show when logged in */}
//                     {user && !isLoginPage && (
//                         <nav className="hidden md:flex items-center gap-6">
//                             <Link
//                                 to="/browse"
//                                 className="text-[14px] text-white font-medium cursor-default"
//                             >
//                                 Home
//                             </Link>
//                             <a
//                                 href="#"
//                                 className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
//                             >
//                                 TV Shows
//                             </a>
//                             <a
//                                 href="#"
//                                 className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
//                             >
//                                 Movies
//                             </a>
//                             <a
//                                 href="#"
//                                 className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
//                             >
//                                 New & Popular
//                             </a>
//                             <a
//                                 href="#"
//                                 className="text-[14px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-300"
//                             >
//                                 My List
//                             </a>
//                         </nav>
//                     )}
//                 </div>

//                 {/* Right Section - Search, Notifications, User */}
//                 {user && !isLoginPage && (
//                     <div className="flex items-center gap-5">
//                         {/* AI Search Button - Styled to fit Netflix theme */}
//                         {/* AI Search Button - Vibrant Gradient Pop */}
//                         <Link
//                             to="/search"
//                             className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
//                         >
//                             <svg
//                                 className="w-5 h-5 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2.5}
//                                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                 />
//                             </svg>
//                             <span className="hidden lg:block text-sm font-bold text-white tracking-wide">
//                                 AI Search
//                             </span>
//                         </Link>

//                         {/* Notification Bell */}
//                         <button className="text-white hover:text-gray-300 transition-colors cursor-pointer">
//                             <svg
//                                 className="w-6 h-6"
//                                 fill="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path d="M13 2.05v-.05a1 1 0 1 0-2 0v.05a8.003 8.003 0 0 0-7 8v5.586l-1.707 1.707a1 1 0 0 0 .707 1.707h18a1 1 0 0 0 .707-1.707l-1.707-1.707V10.05a8.003 8.003 0 0 0-7-8M6 10.05a6 6 0 1 1 12 0v6.293l.293.293H5.707l.293-.293V10.05M12 21.5a3.003 3.003 0 0 0 2.83-2h-5.66a3.003 3.003 0 0 0 2.83 2" />
//                             </svg>
//                         </button>

//                         {/* Profile Dropdown */}
//                         <div
//                             className="relative group"
//                             onMouseEnter={() => setShowDropdown(true)}
//                             onMouseLeave={() => setShowDropdown(false)}
//                         >
//                             <div className="flex items-center gap-2 cursor-pointer py-2">
//                                 <img
//                                     className="w-8 h-8 rounded-[4px]"
//                                     src={user_icon}
//                                     alt="User icon"
//                                 />
//                                 <svg
//                                     className={`w-3 h-3 text-white transition-transform duration-300 ${
//                                         showDropdown ? 'rotate-180' : ''
//                                     }`}
//                                     fill="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path d="M7 10l5 5 5-5z" />
//                                 </svg>
//                             </div>

//                             {/* Dropdown Menu */}
//                             <div
//                                 className={`absolute right-0 top-full mt-0 w-56 bg-black/95 border border-[#333] shadow-2xl transition-all duration-150 origin-top-right ${
//                                     showDropdown
//                                         ? 'opacity-100 visible translate-y-0'
//                                         : 'opacity-0 invisible -translate-y-2'
//                                 }`}
//                             >
//                                 {/* Arrow pointing up */}
//                                 <div className="absolute -top-2 right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#e5e5e5]"></div>

//                                 <div className="flex flex-col py-2">
//                                     {/* Profiles Section */}
//                                     <div className="px-3 py-2 flex items-center gap-3 cursor-pointer group/profile">
//                                         <img
//                                             className="w-8 h-8 rounded-[4px]"
//                                             src={user_icon}
//                                             alt="Profile"
//                                         />
//                                         <div className="flex flex-col">
//                                             <span className="text-[13px] text-white group-hover/profile:underline leading-tight mb-[2px]">
//                                                 {user.displayName || 'User'}
//                                             </span>
//                                             <span className="text-[13px] text-white group-hover/profile:underline font-light leading-tight">
//                                                 Manage Profiles
//                                             </span>
//                                         </div>
//                                     </div>

//                                     {/* Menu Items */}
//                                     <div className="mt-2 text-[13px] text-white font-bold px-3 py-1.5 hover:underline cursor-pointer">
//                                         Transfer Profile
//                                     </div>
//                                     <div className="text-[13px] text-white font-bold px-3 py-1.5 hover:underline cursor-pointer">
//                                         Account
//                                     </div>
//                                     <div className="text-[13px] text-white font-bold px-3 py-1.5 hover:underline cursor-pointer">
//                                         Help Center
//                                     </div>

//                                     <div className="border-t border-[#333] my-2"></div>

//                                     <button
//                                         onClick={handleSignOut}
//                                         className="w-full text-center py-1 text-[13px] text-white hover:underline cursor-pointer font-bold"
//                                     >
//                                         Sign out of Netflix
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </header>
//     )
// }

// export default Header

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
            style={{
                position: 'fixed',
                width: '100%',
                zIndex: 50,
                backgroundColor: isLoginPage
                    ? 'transparent'
                    : isScrolled
                      ? '#141414'
                      : 'transparent',
                backgroundImage: isLoginPage
                    ? 'none'
                    : isScrolled
                      ? 'none'
                      : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent)',
                transition: 'background-color 0.3s ease',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 60px',
                }}
            >
                {/* Left Section - Logo & Nav */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '40px',
                    }}
                >
                    {/* Netflix Logo */}
                    <Link to={user ? '/browse' : '/'}>
                        <img
                            style={{ width: '92px', cursor: 'pointer' }}
                            src={main_LOGO}
                            alt="Netflix Logo"
                        />
                    </Link>

                    {/* Navigation Links - Only show when logged in */}
                    {user && !isLoginPage && (
                        <nav
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                            }}
                        >
                            <Link
                                to="/browse"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Home
                            </Link>
                            <a
                                href="#"
                                style={{
                                    fontSize: '14px',
                                    color: '#e5e5e5',
                                    textDecoration: 'none',
                                }}
                            >
                                TV Shows
                            </a>
                            <a
                                href="#"
                                style={{
                                    fontSize: '14px',
                                    color: '#e5e5e5',
                                    textDecoration: 'none',
                                }}
                            >
                                Movies
                            </a>
                            <a
                                href="#"
                                style={{
                                    fontSize: '14px',
                                    color: '#e5e5e5',
                                    textDecoration: 'none',
                                }}
                            >
                                New & Popular
                            </a>
                            <a
                                href="#"
                                style={{
                                    fontSize: '14px',
                                    color: '#e5e5e5',
                                    textDecoration: 'none',
                                }}
                            >
                                My List
                            </a>
                            <a
                                href="#"
                                style={{
                                    fontSize: '14px',
                                    color: '#e5e5e5',
                                    textDecoration: 'none',
                                }}
                            >
                                Browse by Languages
                            </a>
                        </nav>
                    )}
                </div>

                {/* Right Section - Search, Notifications, User */}
                {user && !isLoginPage && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        {/* AI Search Button - Red like Netflix */}
                        <Link
                            to="/search"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                backgroundColor: '#E50914',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <svg
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    color: 'white',
                                }}
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
                            <span
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'white',
                                }}
                            >
                                AI Search
                            </span>
                        </Link>

                        {/* Notification Bell */}
                        <button
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0',
                            }}
                        >
                            <svg
                                style={{
                                    width: '22px',
                                    height: '22px',
                                    color: 'white',
                                }}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                            </svg>
                        </button>

                        {/* Profile Dropdown */}
                        <div
                            style={{ position: 'relative' }}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '4px',
                                    }}
                                    src={user_icon}
                                    alt="User icon"
                                />
                                <svg
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        color: 'white',
                                        transform: showDropdown
                                            ? 'rotate(180deg)'
                                            : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease',
                                    }}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '100%',
                                    paddingTop: '12px',
                                    width: '220px',
                                    display: showDropdown ? 'block' : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                        border: '1px solid #333',
                                    }}
                                >
                                    <div style={{ padding: '10px 0' }}>
                                        {/* Profile */}
                                        <div
                                            style={{
                                                padding: '10px 16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '4px',
                                                }}
                                                src={user_icon}
                                                alt="Profile"
                                            />
                                            <span
                                                style={{
                                                    fontSize: '13px',
                                                    color: 'white',
                                                }}
                                            >
                                                {user.displayName || 'User'}
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                borderTop: '1px solid #333',
                                                margin: '8px 0',
                                            }}
                                        ></div>

                                        <div
                                            style={{
                                                padding: '8px 16px',
                                                fontSize: '13px',
                                                color: 'white',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Account
                                        </div>
                                        <div
                                            style={{
                                                padding: '8px 16px',
                                                fontSize: '13px',
                                                color: 'white',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Help Center
                                        </div>

                                        <div
                                            style={{
                                                borderTop: '1px solid #333',
                                                margin: '8px 0',
                                            }}
                                        ></div>

                                        <button
                                            onClick={handleSignOut}
                                            style={{
                                                width: '100%',
                                                textAlign: 'center',
                                                padding: '8px 16px',
                                                fontSize: '13px',
                                                color: 'white',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Sign out of Netflix
                                        </button>
                                    </div>
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
