import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    return (
        <div className="px-4 md:px-12 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                {title}
            </h2>

            <div className="flex gap-3 md:gap-4 overflow-x-scroll custom-scrollbar pb-4">
                {movies?.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                    />
                ))}
            </div>
        </div>
    )
}

export default MovieList
