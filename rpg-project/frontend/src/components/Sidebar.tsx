import React from "react";

import "../style/sidebar.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faShield, faTree, faCoins, faFire, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Inventory } from "./User/Inventory";

const Sidebar = () => {
    return (
        <div className="game">
            <div className="side-bar">
                <h3 style={{ textAlign: "center" }}>THE FOREST</h3>
                <div style={{ marginTop: "20px", borderBottom: "3px solid #1B0000" }} className="h-line bar-line"></div>

                <Button variant="success" type="submit" className="mb-2 w-100 c-btn menu-btn">
                    <p className="btn-name">
                        <FontAwesomeIcon className="icon" icon={faTree} /> Adventure
                    </p>
                </Button>
                <Button variant="success" type="submit" className="mb-2 w-100 c-btn menu-btn">
                    <p className="btn-name">
                        {" "}
                        <FontAwesomeIcon className="icon" icon={faCoins} /> Shop
                    </p>
                </Button>
                <div style={{ marginTop: "20px", borderBottom: "3px solid #1B0000" }} className="h-line bar-line"></div>

                <Inventory />
                <Button variant="success" type="submit" className="mb-2 w-100 c-btn menu-btn signout">
                    <p className="btn-name">
                        {" "}
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} /> Sign out
                    </p>
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
