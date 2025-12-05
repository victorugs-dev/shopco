import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import MainLayout from "../layouts/MainLayout";
import ProductDetails from "../pages/ProductDetails";
import SignUp from "../pages/SignUp";
import ProductListing from "../pages/ProductListing";
import UserProfile from "../pages/UserProfile";
import Cart from "../pages/Cart";
import NewArrivals from "../pages/NewArrivals";

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
            { path: "new-arrivals", element: <NewArrivals/> },
            { path: "sign-up", element: <SignUp/>},
            { path: "product-listing", element: <ProductListing/> },
            { path: "user-profile", element: <UserProfile/>},
            // { path: 'cart-page', element: <Cart/>}
            { path: 'your-cart', element: <Cart/>}


        ]
    },
]);












































export default router