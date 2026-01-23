import Header from './Header'
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../Hooks/usePopularMovies'
import useTopRatedMovies from '../Hooks/useTopRatedMovies'
import useUpcomingMovies from '../Hooks/useUpcomingMovies'

const Browse = () => {
    useNowPlayingMovies()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()

    return (
        <div className="bg-[#141414]">
            {/* Fixed Header - Always on top */}
            <Header />

            {/* Main Hero Section */}
            <MainContainer />

            {/* Movie Rows - Overlaps hero slightly */}
            <SecondaryContainer />
        </div>
    )
}

export default Browse
