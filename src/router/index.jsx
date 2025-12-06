import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import SignUp from "../pages/SignUp";
import ShopAll from "../pages/ShopAll";
import NewArrivals from "../pages/NewArrivals";
import Shirts from "../pages/Shirts";
import TrackTops from "../pages/TrackTops";
import Bottoms from "../pages/Bottoms";
import Jackets from "../pages/Jackets";
import Jumpers from "../pages/Jumpers";
import Tees from "../pages/Tees";
import Sport from "../pages/Sport";
import Shoes from "../pages/Shoes";
import AboutUs from "../pages/AboutUs";
import UserProfile from "../pages/UserProfile";
import Cart from "../pages/Cart";

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
            { path: ":slug", element: <ProductDetails/> },
            { path: "sign-up", element: <SignUp/>},
            { path: "shop-all", element: <ShopAll /> },
            { path: "new-arrivals", element: <NewArrivals/> },
            { path: "shirts", element: <Shirts/> },
            { path: "track-tops", element: <TrackTops /> },
            { path: "bottoms", element: <Bottoms /> },
            { path: "jackets", element: <Jackets /> },
            { path: "jumpers", element: <Jumpers /> },
            { path: "tees", element: <Tees /> },
            { path: "sport", element: <Sport /> },
            { path: "shoes", element: <Shoes /> },
            { path: "about-us", element: <AboutUs /> },
            // { path: "categories", element: <Categories/> },
            // { path: 'cart-page', element: <Cart/>}
            { path: "user-profile", element: <UserProfile/>},
            { path: 'your-cart', element: <Cart/>}


        ]
    },
]);

export default router