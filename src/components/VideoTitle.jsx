const VideoTitle = ({ title, overview }) => {
    return (
        <div className="space-y-6 pt-36 md:pt-0">
            {/* Netflix Badge */}
            <div className="flex items-center gap-2 mb-2 animate-fade-in">
                <span className="text-red-600 font-extrabold text-4xl tracking-tighter">
                    N
                </span>
                <span className="text-gray-300 font-bold text-xs tracking-[0.2em] uppercase">
                    Series
                </span>
            </div>

            {/* Movie Title - Tighter, Bolder, Cleaner */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                {title}
            </h1>

            {/* Meta & Description */}
            <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-3 text-white font-medium text-sm md:text-base">
                    <span className="text-green-400 font-bold">98% Match</span>
                    <span className="text-gray-300">2024</span>
                    <span className="border border-gray-500 px-1 text-xs">
                        A+
                    </span>
                    <span className="text-gray-300">
                        Watch in Hindi, English
                    </span>
                </div>

                <p className="hidden md:block text-base lg:text-lg text-gray-100/90 leading-relaxed font-normal line-clamp-3 drop-shadow-md">
                    {overview}
                </p>
            </div>

            {/* Action Buttons - Polished & Aligned */}
            <div className="flex items-center gap-3 pt-2">
                <button className="flex items-center gap-2 px-7 py-2.5 bg-white text-black font-bold text-lg rounded hover:bg-white/90 active:scale-95 transition-all duration-200">
                    <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24">
                        <path d="M6 4l15 8-15 8V4z" />
                    </svg>
                    Play
                </button>

                <button className="flex items-center gap-2 px-7 py-2.5 bg-zinc-500/50 text-white font-bold text-lg rounded backdrop-blur-sm hover:bg-zinc-500/40 active:scale-95 transition-all duration-200">
                    <svg
                        className="w-7 h-7 stroke-white"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle
