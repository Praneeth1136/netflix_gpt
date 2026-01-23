import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
    const gpt = useSelector((store) => store.gptMovies)
    const gptMovies = gpt?.gptResMovies
    const isLoading = gpt?.isLoading

    // Loading Shimmer UI
    if (isLoading) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {[1, 2].map((row) => (
                    <div key={row} style={{ marginBottom: '32px' }}>
                        <div
                            style={{
                                height: '28px',
                                width: '200px',
                                backgroundColor: '#333',
                                borderRadius: '4px',
                                marginBottom: '16px',
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                overflow: 'hidden',
                            }}
                        >
                            {[1, 2, 3, 4, 5].map((card) => (
                                <div
                                    key={card}
                                    style={{
                                        width: '200px',
                                        height: '300px',
                                        backgroundColor: '#333',
                                        borderRadius: '4px',
                                        flexShrink: 0,
                                    }}
                                />
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
            <div
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    textAlign: 'center',
                    padding: '64px 16px',
                }}
            >
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 24px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span style={{ fontSize: '32px' }}>🎬</span>
                </div>
                <p
                    style={{
                        color: '#888',
                        fontSize: '18px',
                        marginBottom: '8px',
                    }}
                >
                    Ready to discover something new?
                </p>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    Tell us what you're in the mood for and let AI find the
                    perfect movies for you.
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
