import { Link } from 'react-router-dom'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { useDispatch } from 'react-redux'
import { removeGptMovies } from '../utils/gptSlice'
import { main_LOGO, login_wallpaper } from '../utils/constants'

const GptSearch = () => {
    const dispatch = useDispatch()

    const handleAiSearch = () => {
        dispatch(removeGptMovies())
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Background Image */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                }}
            >
                <img
                    src={login_wallpaper}
                    alt="background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    }}
                />
            </div>

            {/* Header */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    backgroundColor: 'transparent',
                    padding: '16px 48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Link to="/browse" onClick={handleAiSearch}>
                    <img
                        style={{ width: '100px', cursor: 'pointer' }}
                        src={main_LOGO}
                        alt="Netflix Logo"
                    />
                </Link>

                <Link
                    to="/browse"
                    onClick={handleAiSearch}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        textDecoration: 'none',
                    }}
                >
                    ← Back to Browse
                </Link>
            </div>

            {/* Main Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    paddingTop: '70px',
                    paddingLeft: '48px',
                    paddingRight: '48px',
                    paddingBottom: '24px',
                    flex: 1,
                }}
            >
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </div>
    )
}

export default GptSearch
