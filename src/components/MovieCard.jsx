import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath, title }) => {
    if (!posterPath) return null

    return (
        <div
            className="relative flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ width: '256px', height: '143px' }}
        >
            {/* Movie Image */}
            <img
                alt={title}
                src={IMG_CDN_URL + posterPath}
                className="rounded-sm w-full h-full object-cover"
            />

            {/* Title inside card - bottom aligned */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-md font-semibold truncate">
                    {title}
                </p>
            </div>
        </div>
    )
}

export default MovieCard
