import React, { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserPage from "./pages/UserPage";
import Loading from "./components/MainComponents/Loading";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/load" element={<Loading />} />
        </Routes>
    );
}

export default App;
