import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGrin,
    faRotate,
    faGamepad,
    faUserGroup,
    faLightbulb,
    faCoins,
    faLink,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import "../styles/joke.css";

type Act = {
    activity: string;
    type: string;
    participants: number;
    price: number;
    link: string;
};

let jk: Act = {
    activity: "Think of a new business idea",
    type: "ok",
    participants: 1,
    price: 0,
    link: "",
};

const Activity = () => {
    const [act, setAct] = useState({} as Act);
    const variant = "Danger";
    useEffect(() => {
        loadAct();
    }, []);

    const loadAct = () => {
        console.log("Loaded");
        axios
            .get("https://www.boredapi.com/api/activity")
            .then((res) => {
                setAct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {act && (
                <>
                    <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === "light" ? "dark" : "white"}
                        className="mb-2 custom-card"
                    >
                        <Card.Header>
                            <FontAwesomeIcon icon={faGamepad} /> Activity
                            <FontAwesomeIcon
                                style={{ position: "absolute", right: "10", cursor: "pointer" }}
                                icon={faRotate}
                                onClick={(e) => loadAct()}
                            />
                        </Card.Header>{" "}
                        <Card.Body>
                            <Card.Title>
                                {" "}
                                <FontAwesomeIcon icon={faLightbulb} /> {act.activity}
                            </Card.Title>
                            <Card.Title>
                                <FontAwesomeIcon icon={faUserGroup} /> {act.participants}
                            </Card.Title>
                            <Card.Title>
                                {" "}
                                <FontAwesomeIcon icon={faCoins} /> {act.price} $
                            </Card.Title>
                            <Card.Title>
                                {act.link != "" && (
                                    <>
                                        {" "}
                                        <FontAwesomeIcon icon={faLink} /> {act.link}
                                    </>
                                )}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
};

export default Activity;
