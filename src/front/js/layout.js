import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Login } from "./pages/Login";
// import { Forgot } from "./pages/Forgot";
import { Signup } from "./pages/Signup";
import PasswordRecovery from "./pages/PasswordRecovery.js";
import PasswordReset from "./pages/PasswordReset";
import Dashboard from "./pages/Dashboard";
import Ingredients from "./pages/Ingredients";
import { Profile } from "./pages/Profile";
import Products from "./pages/Products";
import Recipes from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipe";
import { EditProfile } from "./pages/EditProfile";


const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<PasswordRecovery />} path="/passwordrecovery" />
                        <Route element={<PasswordReset />} path="/passwordreset" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Ingredients />} path="/dashboard/ingredients" />
                        <Route element={<Profile />} path="/dashboard/profile" />
                        <Route element={<EditProfile />} path="/dashboard/edit-profile" />
                        <Route element={<Products />} path="/dashboard/products" />
                        <Route element={<Recipes />} path="/dashboard/recipes" />
                        <Route element={<SingleRecipe />} path="/dashboard/recipes/:recipe_id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);