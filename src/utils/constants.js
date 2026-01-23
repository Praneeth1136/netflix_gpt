export const main_LOGO =
    'https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'

export const login_wallpaper =
    'https://assets.nflxext.com/ffe/siteui/vlv3/e393bb3f-261f-43d1-99bb-16a157885615/web/IN-en-20260105-TRIFECTA-perspective_2802b120-4b8c-44a5-8fb9-617a728f4ec6_large.jpg'

export const user_icon =
    'https://avatars.githubusercontent.com/u/145996746?s=400&u=f1e8ef68ee1c69cfcbcf93fb5f200bf278b5d144&v=4'

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY,
    },
}
export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500'

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
