import { useState } from "react";
import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RandomJoke from "./components/RandomJoke";
import Api from "./components/Api";
import TopBar from "./components/TopBar";
import Activity from "./components/Activity";
import NameSearch from "./components/NameSearch";

function App() {
    return (
        <>
            <TopBar />
            <div className="container">
                <RandomJoke />
                <Api />
                <NameSearch />
                <Activity />
            </div>
        </>
    );
}

export default App;
