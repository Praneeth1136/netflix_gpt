import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
    const gpt = useSelector((store) => store.gptMovies)
    const gptMovies = gpt?.gptResMovies
    const isLoading = gpt?.isLoading

    // Loading Shimmer UI
    if (isLoading) {
        return (
            <div
                style={{
                    marginBottom: '24px',
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                {/* Row Title Shimmer */}
                <div
                    style={{
                        height: '24px',
                        width: '200px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        marginBottom: '16px',
                    }}
                />
                {/* Cards Shimmer */}
                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        overflow: 'hidden',
                    }}
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((card) => (
                        <div
                            key={card}
                            style={{
                                width: '200px',
                                minWidth: '200px',
                                aspectRatio: '2/3',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                flexShrink: 0,
                            }}
                        />
                    ))}
                </div>
            </div>
        )
    }

    // No results yet - show empty state
    if (!gptMovies) {
        return (
            <div
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    textAlign: 'center',
                    padding: '80px 16px',
                }}
            >
                <p
                    style={{
                        color: '#666',
                        fontSize: '15px',
                    }}
                >
                    Your recommendations will appear here
                </p>
            </div>
        )
    }

    // Show results
    return (
        <div style={{ width: '100%' }}>
            <MovieList
                title="AI Recommended Movies"
                movies={gptMovies.flat().filter(Boolean)}
            />
        </div>
    )
}

export default GptMovieSuggestions
