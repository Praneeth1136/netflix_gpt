import { useRef } from 'react'
import { askGemini } from '../utils/gemini'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addGptMovies, setLoading } from '../utils/gptSlice'

const GptSearchBar = () => {
    const searchText = useRef(null)
    const dispatch = useDispatch()

    const searchMovieTmdb = async (movie) => {
        const data = await fetch(
            'https://api.themoviedb.org/3/search/movie?query=' +
                movie +
                '&include_adult=false&language=en-US&page=1',
            API_OPTIONS
        )
        const json = await data.json()
        return json.results
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchText.current.value.trim()) return

        dispatch(setLoading(true))

        const prompt = `
      Act as a movie expert.
      Suggest 5 movies based on: ${searchText.current.value}.
      Return only a comma-separated list.
    `

        const response = await askGemini(prompt)

        if (!response) {
            alert(
                'Gemini API Error: The API Key is invalid or the Model is unavailable. (Check console for details)'
            )
            dispatch(setLoading(false))
            return
        }

        const movieList = response.split(',').map((m) => m.trim())
        const promiseArray = movieList.map((movie) => searchMovieTmdb(movie))
        const tmdbResults = await Promise.all(promiseArray)

        dispatch(addGptMovies(tmdbResults))
    }

    const suggestions = [
        'Action thrillers',
        'Romantic comedies',
        'Mind-bending sci-fi',
        'Based on true stories',
        'Animated classics',
    ]

    return (
        <div
            style={{
                maxWidth: '800px',
                margin: '0 auto',
                marginBottom: '48px',
            }}
        >
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1
                    style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: '12px',
                    }}
                >
                    Let AI Find Your Next Movie
                </h1>
                <p style={{ color: '#888', fontSize: '18px' }}>
                    Describe what you're in the mood for and get personalized
                    recommendations
                </p>
            </div>

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}
            >
                <input
                    type="text"
                    ref={searchText}
                    placeholder="e.g., Scary movies with a twist ending..."
                    style={{
                        flex: 1,
                        padding: '16px 20px',
                        fontSize: '16px',
                        backgroundColor: '#333',
                        color: 'white',
                        border: '1px solid #555',
                        borderRadius: '8px',
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '16px 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'white',
                        background:
                            'linear-gradient(to right, #9333ea, #dc2626)',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}
                >
                    ⚡ Search with AI
                </button>
            </form>

            {/* Suggestion Tags */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    justifyContent: 'center',
                }}
            >
                {suggestions.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => {
                            searchText.current.value = tag
                        }}
                        style={{
                            padding: '8px 16px',
                            fontSize: '14px',
                            color: '#ccc',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default GptSearchBar
