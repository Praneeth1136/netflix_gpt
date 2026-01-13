import Login from './Login';
import Browse from "./Browse";
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path : '/',
            element:<Login/>
        },
        {
            path:'/browse',
            element:<Browse/>
        }
    ])

    return(
        <>
        {/* <Login/>
        <Browse/> */}
        <RouterProvider router={appRouter}/>
        </>
    )
}

export default Body;