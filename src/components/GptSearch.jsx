import { Link } from 'react-router-dom'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { useDispatch } from 'react-redux'
import { removeGptMovies } from '../utils/gptSlice'
import { main_LOGO } from '../utils/constants'

const GptSearch = () => {
    const dispatch = useDispatch()

    const handleAiSearch = () => {
        dispatch(removeGptMovies())
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#141414',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    backgroundColor: '#141414',
                    borderBottom: '1px solid #333',
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
                    paddingTop: '100px',
                    paddingLeft: '48px',
                    paddingRight: '48px',
                    paddingBottom: '48px',
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
