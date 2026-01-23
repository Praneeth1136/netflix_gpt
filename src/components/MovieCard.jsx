import { useState } from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath, title }) => {
    const [isHovered, setIsHovered] = useState(false)

    if (!posterPath) return null

    return (
        <div
            style={{
                position: 'relative',
                width: '180px',
                flexShrink: 0,
                cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card Container - Fixed size, hover affects inner content */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '2/3',
                    overflow: 'visible',
                }}
            >
                {/* Scaled Content on Hover */}
                <div
                    style={{
                        position: 'absolute',
                        top: isHovered ? '-20%' : '0',
                        left: isHovered ? '-10%' : '0',
                        width: isHovered ? '120%' : '100%',
                        height: isHovered ? '140%' : '100%',
                        transition: 'all 0.3s ease',
                        zIndex: isHovered ? 50 : 1,
                        borderRadius: '4px',
                        overflow: 'hidden',
                        boxShadow: isHovered
                            ? '0 10px 40px rgba(0,0,0,0.8)'
                            : 'none',
                    }}
                >
                    {/* Poster Image */}
                    <img
                        alt={title}
                        src={IMG_CDN_URL + posterPath}
                        style={{
                            width: '100%',
                            height: isHovered ? '70%' : '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />

                    {/* Info Panel - Only on Hover */}
                    {isHovered && (
                        <div
                            style={{
                                backgroundColor: '#181818',
                                padding: '12px',
                                height: '30%',
                            }}
                        >
                            {/* Action Buttons */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginBottom: '8px',
                                }}
                            >
                                <button
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span style={{ fontSize: '14px' }}>▶</span>
                                </button>
                                <button
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'transparent',
                                        border: '2px solid #666',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span style={{ fontSize: '16px' }}>+</span>
                                </button>
                                <button
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'transparent',
                                        border: '2px solid #666',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span style={{ fontSize: '12px' }}>👍</span>
                                </button>
                            </div>

                            {/* Title */}
                            <p
                                style={{
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    marginBottom: '4px',
                                }}
                            >
                                {title}
                            </p>

                            {/* Match & Rating */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '11px',
                                }}
                            >
                                <span
                                    style={{
                                        color: '#46d369',
                                        fontWeight: '600',
                                    }}
                                >
                                    98% Match
                                </span>
                                <span
                                    style={{
                                        padding: '1px 4px',
                                        border: '1px solid #666',
                                        color: '#aaa',
                                        fontSize: '10px',
                                    }}
                                >
                                    U/A 13+
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieCard
