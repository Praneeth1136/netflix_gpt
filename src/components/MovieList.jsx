import { useRef, useState } from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    const rowRef = useRef(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const handleScroll = () => {
        if (rowRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = rowRef.current.clientWidth * 0.8
            rowRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div
            style={{
                marginBottom: '24px',
                paddingLeft: '0',
                paddingRight: '0',
            }}
        >
            {/* Row Title */}
            <h2
                style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '12px',
                }}
            >
                {title}
            </h2>

            {/* Slider Container */}
            <div
                style={{
                    position: 'relative',
                    marginLeft: '0',
                    marginRight: '0',
                }}
            >
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: '20px',
                            zIndex: 40,
                            width: '48px',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            fontSize: '24px',
                        }}
                    >
                        ‹
                    </button>
                )}

                {/* Movie Cards Container */}
                <div
                    ref={rowRef}
                    onScroll={handleScroll}
                    className="custom-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '10px',
                        overflowX: 'auto',
                        paddingBottom: '20px',
                        paddingTop: '8px',
                        paddingLeft: '0',
                        paddingRight: '0',
                    }}
                >
                    {movies?.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                        />
                    ))}
                </div>

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: '60px',
                            zIndex: 40,
                            width: '48px',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            fontSize: '24px',
                        }}
                    >
                        ›
                    </button>
                )}
            </div>
        </div>
    )
}

export default MovieList
