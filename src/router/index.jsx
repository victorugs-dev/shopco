import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import MainLayout from "../layouts/MainLayout";
import ProductDetails from "../pages/ProductDetails";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <SignUp />
    // },
    {
        // path: "/main",
        path: "/",
        element: <MainLayout />,
        children:[
            { index: true, element: <Home/> },
            { path: "categories", element: <Categories/> },
            { path: ":slug", element: <ProductDetails/> },
            { path: "sign-up", element: <SignUp/>}
        ]
    },
]);












































export default router