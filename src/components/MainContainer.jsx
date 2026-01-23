import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies = useSelector((store) => store.movies.nowPlayingMovies)

    if (movies === null) return null

    const mainMovie = movies?.[0]
    const { original_title, overview, id } = mainMovie

    return (
        <div className="relative w-full min-h-screen">
            {/* Video/Image Background - Full viewport */}
            <div className="absolute inset-0 w-full h-full">
                <VideoBackground movieId={id} />
            </div>

            {/* Content Overlay - Netflix style positioning */}
            <div className="relative z-10 min-h-screen flex flex-col justify-end">
                {/* Hero Content - Bottom left positioned like Netflix */}
                <div className="px-4 md:px-12 lg:px-16 pb-40 md:pb-48 lg:pb-56">
                    <div className="max-w-2xl">
                        <VideoTitle
                            title={original_title}
                            overview={overview}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom gradient for seamless transition to movie rows */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent pointer-events-none"></div>

            {/* Age Rating Badge - Bottom right corner like Netflix */}
            <div className="absolute bottom-8 right-4 md:right-12 z-20 flex items-center gap-2">
                <div className="bg-[#333]/80 border-l-4 border-white px-3 py-1">
                    <span className="text-white text-sm font-medium">
                        U/A 16+
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MainContainer
