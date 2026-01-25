import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies = useSelector((store) => store.movies.nowPlayingMovies)

    if (movies === null) return null

    const mainMovie = movies?.[0]
    const { original_title, overview, id } = mainMovie

    return (
        <div className="relative w-full aspect-video md:h-screen bg-black pt-[30%] md:pt-0">
            {/* Background */}
            <VideoBackground movieId={id} />

            {/* Content Overlay */}
            <VideoTitle title={original_title} overview={overview} />
        </div>
    )
}

export default MainContainer
