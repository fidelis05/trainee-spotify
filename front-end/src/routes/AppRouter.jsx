import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { checkLoginStatus } from "../services/api";
import ArtistsPage from "../pages/ArtistsPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CurtidasPage from "../pages/LikesPage";
import Account from "../pages/Account";
import ArtistSongs from "../pages/ArtistsongsPage";
import Sidebar from "../components/Sidebar";

function AppRouter() {
    const isLoggedIn = checkLoginStatus();

    return (
        <Router>
            <div className="flex w-screen">
            {isLoggedIn && <Sidebar />}
                <Routes>
                    <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/artists" />} />
                    <Route path="/signup" element={!isLoggedIn ? <SignupPage /> : <Navigate to="/artists" />} />

                    <Route path="/artists" element={isLoggedIn ? <ArtistsPage /> : <Navigate to="/login" />} />
                    <Route path="/likes" element={isLoggedIn ? <CurtidasPage /> : <Navigate to="/login" />} />
                    <Route path="/artists/:artistId" element={isLoggedIn ? <ArtistSongs /> : <Navigate to="/login" />} />
                    <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/login" />} />

                    <Route path="*" element={<Navigate to={isLoggedIn ? "/artists" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;
