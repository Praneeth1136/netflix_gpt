// ========== GptMovieSuggestions.jsx ==========
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
    const gpt = useSelector((store) => store.gptMovies)
    const gptMovies = gpt?.gptResMovies
    const isLoading = gpt?.isLoading

    console.log(gpt)

    // Loading Shimmer UI
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
                {[1, 2, 3].map((row) => (
                    <div key={row} className="space-y-4">
                        {/* Shimmer Title */}
                        <div className="h-8 w-64 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded animate-shimmer bg-[length:200%_100%]"></div>

                        {/* Shimmer Cards */}
                        <div className="flex gap-3 overflow-hidden">
                            {[1, 2, 3, 4, 5].map((card) => (
                                <div
                                    key={card}
                                    className="flex-shrink-0"
                                    style={{ width: '256px', height: '143px' }}
                                >
                                    <div className="w-full h-full bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-md animate-shimmer bg-[length:200%_100%]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // No results yet - show empty state
    if (!gptMovies) {
        return (
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                <div className="text-center py-20">
                    <p className="text-gray-400 text-xl">
                        Search for movies and get AI-powered recommendations!
                    </p>
                </div>
            </div>
        )
    }

    // Show results
    return (
        <div className="max-w-7xl mx-auto pb-20">
            <MovieList
                title="Recommended Movies"
                movies={gptMovies.flat().filter(Boolean)}
            />
        </div>
    )
}

export default GptMovieSuggestions
