const VideoTitle = ({ title, overview }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: '15%',
                paddingLeft: '48px',
                zIndex: 20,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '48px',
                    maxWidth: '650px',
                }}
            >
                {/* Movie Title */}
                <h1
                    style={{
                        fontSize: '64px',
                        fontWeight: '800',
                        color: 'white',
                        lineHeight: '1.1',
                        letterSpacing: '-1px',
                        textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                        marginBottom: '20px',
                    }}
                >
                    {title}
                </h1>

                {/* Description */}
                <p
                    style={{
                        fontSize: '18px',
                        fontWeight: '400',
                        color: 'white',
                        lineHeight: '1.5',
                        maxWidth: '600px',
                        textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                        marginBottom: '24px',
                    }}
                >
                    {overview}
                </p>

                {/* Action Buttons */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '10px 28px',
                            backgroundColor: 'white',
                            color: 'black',
                            fontSize: '18px',
                            fontWeight: '700',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        <svg
                            style={{
                                width: '24px',
                                height: '24px',
                                fill: 'black',
                            }}
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Play</span>
                    </button>

                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '10px 28px',
                            backgroundColor: 'rgba(109, 109, 110, 0.7)',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '700',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        <svg
                            style={{
                                width: '24px',
                                height: '24px',
                                fill: 'white',
                            }}
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        <span>More Info</span>
                    </button>
                </div>
            </div>

            {/* Age Rating - Bottom Right */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '48px',
                }}
            >
                <span
                    style={{
                        fontSize: '80px',
                        fontWeight: 'bold',
                        color: 'rgba(255,255,255,0.4)',
                        borderLeft: '6px solid rgba(255,255,255,0.4)',
                        paddingLeft: '24px',
                    }}
                >
                    U/A 16+
                </span>
            </div>
        </div>
    )
}

export default VideoTitle
