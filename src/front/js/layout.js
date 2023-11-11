import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { AlmaCenaNavbar } from "./component/AlmaCenaNavBar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { Signup } from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Ingredients from "./pages/Ingredients";
import { Profile } from "./pages/profile";
import { MyProducts } from "./pages/myproducts";
import { MyRecipes } from "./pages/myrecipes";
import { SingleRecipe } from "./pages/singlerecipe";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <AlmaCenaNavbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Forgot />} path="/forgot" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Ingredients />} path="/dashboard/ingredients" />
                        <Route element={<Profile />} path="/dashboard/profile" />
                        <Route element={<MyProducts />} path="/dashboard/products" />
                        <Route element={<MyRecipes />} path="/dashboard/recipes" />
                        <Route element={<SingleRecipe />} path="/dashboard/recipes/single-recipe" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
