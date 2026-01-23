// ========== GptSearchBar.jsx ==========
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
        console.log('Searching for:', searchText.current.value)

        // Set loading to true
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
        console.log(tmdbResults)

        dispatch(addGptMovies(tmdbResults))
    }

    return (
        <div className="max-w-4xl mx-auto mb-8">
            <h1 className="mb-6 text-2xl font-extrabold text-center text-white sm:text-5xl">
                Get Movie Suggestions from GPT
            </h1>
            <form onSubmit={handleSearch} className="relative">
                <div className="flex gap-3">
                    <input
                        type="text"
                        ref={searchText}
                        placeholder="What would you like to watch today? (e.g., Action movies with cars)"
                        className="flex-1 px-6 py-4 text-base md:text-lg bg-black/70 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition"
                    />
                    <button
                        type="submit"
                        className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 whitespace-nowrap"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}

export default GptSearchBar
