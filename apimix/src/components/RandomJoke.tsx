import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrin, faRotate } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import "../styles/joke.css";

type Activity = {
    activity: string;
    type: string;
    participants: number;
    price: number;
    link: string;
};

let jk: Activity = {
    activity: "Hello",
    type: "ok",
    participants: 1,
    price: 0,
    link: "",
};

type Joke = {
    type: string;
    setup: string;
    punchline: string;
};

const RandomJoke = () => {
    const [joke, setJoke] = useState({} as Joke);
    const variant = "Danger";
    useEffect(() => {
        loadJoke(null);
    }, []);

    const loadJoke = (e: React.MouseEvent | null) => {
        if (e != null) e.preventDefault();
        axios
            .get("https://official-joke-api.appspot.com/random_joke")
            .then((res) => {
                setJoke(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {joke && (
                <>
                    <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === "light" ? "dark" : "white"}
                        className="mb-2 custom-card"
                    >
                        <Card.Header>
                            <FontAwesomeIcon icon={faGrin} /> Joke
                            <FontAwesomeIcon
                                style={{ position: "absolute", right: "10", cursor: "pointer" }}
                                icon={faRotate}
                                onClick={(e) => loadJoke(e)}
                            />
                        </Card.Header>{" "}
                        <Card.Body>
                            <Card.Title>{joke.setup}</Card.Title>
                            <div className="h-line"></div>
                            <Card.Title>{joke.punchline}</Card.Title>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
};

export default RandomJoke;
