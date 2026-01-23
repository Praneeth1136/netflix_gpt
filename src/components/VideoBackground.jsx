import { API_OPTIONS } from '../utils/constants'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice'

const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo)
    const dispatch = useDispatch()

    const getMovieVideos = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/' +
                movieId +
                '/videos?language=en-US',
            API_OPTIONS
        )

        const json = await data.json()

        const filterData = json.results.filter(
            (video) => video.type === 'Trailer'
        )
        const trailer = filterData.length ? filterData[0] : json.results[0]
        dispatch(addTrailerVideo(trailer))
    }

    useEffect(() => {
        getMovieVideos()
    }, [])

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Video Container - Scaled up to cover and remove black bars */}
            <div className="absolute inset-0 w-full h-full">
                <iframe
                    className="absolute top-1/2 left-1/2 min-w-[100vw] min-h-[100vh] w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[1.5]"
                    src={
                        'https://www.youtube.com/embed/' +
                        trailerVideo?.key +
                        '?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&iv_load_policy=3&playlist=' +
                        trailerVideo?.key
                    }
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Gradient Overlays for Netflix effect */}
            {/* Left side gradient - for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

            {/* Bottom gradient - transition to movie rows */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent"></div>

            {/* Top gradient - subtle darkening */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        </div>
    )
}

export default VideoBackground
