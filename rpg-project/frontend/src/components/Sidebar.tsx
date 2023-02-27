import React, { Dispatch, SetStateAction, useState } from "react";

import "../style/sidebar.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree, faCoins, faArrowLeft, faBook, faBarsProgress, faTools } from "@fortawesome/free-solid-svg-icons";
import { Inventory } from "./User/Inventory";
import { VIEW } from "../pages/UserPage";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/UserContext";
import { TooltipPrice } from "./ShopComponents/Tooltip";

const Sidebar = () => {
    const INV = "inventory";
    const PROFILE = "profile";

    const navigate = useNavigate();
    const { setTab, money } = useUserContext();
    const [win, setWin] = useState("inventory");

    return (
        <div className="game">
            <div className="side-bar">
                <div style={{ marginTop: "45px", borderBottom: "3px solid #1B0000" }} className="h-line bar-line"></div>

                <Button
                    onClick={() => setTab(VIEW.ADVENTURE)}
                    variant="success"
                    type="submit"
                    className="mb-3 c-btn menu-btn"
                >
                    <p className="btn-name">
                        <FontAwesomeIcon className="icon" icon={faTree} /> Adventure
                    </p>
                </Button>

                <Button
                    style={{ margin: "2px" }}
                    variant="primary"
                    onClick={() => setTab(VIEW.SHOP)}
                    className="c-btn btn-buy"
                >
                    <FontAwesomeIcon className="icon" icon={faCoins} /> Shop
                </Button>
                <Button style={{ margin: "2px" }} variant="primary" className="c-btn btn-buy">
                    <FontAwesomeIcon className="icon" icon={faTools} /> CRAFT
                </Button>
                <Button
                    style={{ margin: "2px" }}
                    variant="primary"
                    onClick={() => setTab(VIEW.SPELL)}
                    className="c-btn btn-buy"
                >
                    <FontAwesomeIcon className="icon" icon={faBook} /> Spells
                </Button>
                <Button
                    style={{ margin: "2px" }}
                    variant="primary"
                    onClick={() => setTab(VIEW.SHOP)}
                    className="c-btn btn-buy"
                >
                    <FontAwesomeIcon className="icon" icon={faBarsProgress} /> ETC
                </Button>
                <Button
                    style={{ margin: "2px" }}
                    variant="primary"
                    onClick={() => setWin(win == INV ? PROFILE : INV)}
                    className="c-btn btn-buy mr-1"
                >
                    <FontAwesomeIcon className="icon" icon={faBarsProgress} /> Profile
                </Button>

                <div
                    style={{ marginTop: "20px", marginBottom: "5px", borderBottom: "3px solid #1B0000" }}
                    className="bar-line"
                ></div>
                <p className="sidebar-name sh">Mirek</p>
                <TooltipPrice price={money} ml={"0px"} content={"center"} />
                <div
                    style={{ marginBottom: "5px", marginTop: "-5px", borderBottom: "3px solid #1B0000" }}
                    className="h-line bar-line"
                ></div>
                <Inventory win={win} />
                <Button
                    onClick={() => {
                        localStorage.setItem("login", "false");
                        localStorage.setItem("tokn", "");
                        navigate("/");
                    }}
                    variant="success"
                    type="submit"
                    className="mb-2 c-btn menu-btn signout"
                >
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
