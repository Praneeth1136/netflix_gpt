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
      Suggest 8 movies based on: ${searchText.current.value}.
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
        'Something fun to watch tonight',
        'Oscar winning dramas',
        'Feel-good movies',
        '90s classics',
        'Movies like Interstellar',
    ]

    return (
        <div
            style={{
                maxWidth: '700px',
                margin: '0 auto',
                marginBottom: '24px',
                marginTop: '20px',
            }}
        >
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h1
                    style={{
                        fontSize: '36px',
                        fontWeight: '500',
                        color: 'white',
                        marginBottom: '8px',
                        letterSpacing: '-0.5px',
                    }}
                >
                    What are you in the mood for?
                </h1>
                <p style={{ color: '#8c8c8c', fontSize: '16px' }}>
                    Describe a movie and we'll find it for you
                </p>
            </div>

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                style={{ display: 'flex', gap: '0', marginBottom: '16px' }}
            >
                <input
                    type="text"
                    ref={searchText}
                    placeholder="e.g., A thriller with an unexpected twist"
                    style={{
                        flex: 1,
                        padding: '18px 20px',
                        fontSize: '16px',
                        backgroundColor: '#2b2b2b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px 0 0 4px',
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '18px 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: '#E50914',
                        border: 'none',
                        borderRadius: '0 4px 4px 0',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Search
                </button>
            </form>

            {/* Suggestion Tags */}
            <div style={{ textAlign: 'center' }}>
                <p
                    style={{
                        color: '#666',
                        fontSize: '13px',
                        marginBottom: '12px',
                    }}
                >
                    Try searching for:
                </p>
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
                                fontSize: '13px',
                                color: '#aaa',
                                backgroundColor: 'transparent',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GptSearchBar
