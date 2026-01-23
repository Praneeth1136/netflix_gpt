import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies)

    return (
        <div className="bg-[#141414] relative z-20 -mt-32 md:-mt-48 pb-20">
            <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
            <MovieList title={'Popular'} movies={movies.popularMovies} />
            <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
            <MovieList title={'Upcoming'} movies={movies.upcomingMovies} />
        </div>
    )
}

export default SecondaryContainer
