import Login from './Login'
import Browse from './Browse'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Error from './Error'
import GptSearch from './GptSearch'

const Body = () => {
    const dispatch = useDispatch()

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/browse',
            element: <Browse />,
        },
        {
            path: '/error',
            element: <Error />,
        },
        {
            path: '/search',
            element: <GptSearch />,
        },
    ])

    return (
        <>
            {/* <Login/>
        <Browse/> */}
            <RouterProvider router={appRouter} />
        </>
    )
}

export default Body
