import React from "react"
import ReactDOM from "react-dom/client"
import About from "./components/About"
import Login from "./components/Login"
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const App =() =>{
    return(
        <h1 className="text-2xl font-bold font-serif">
            Hello Worlds
        </h1>
    )
}

const appRoutes = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
    },
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<RouterProvider router={appRoutes}/>)