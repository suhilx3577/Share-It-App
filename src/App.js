import React from "react"
import ReactDOM from "react-dom/client"
import About from "./components/About"
import Login from "./components/Login"
import Home from "./container/Home"
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"


const appRoutes = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
    },
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"*",
        element:<Home/>
    }
])


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<RouterProvider router={appRoutes}/>)