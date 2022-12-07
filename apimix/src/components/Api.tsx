import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { faAddressCard, faRotate } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/joke.css";

type IP = {
    ip: string;
};

const Api = () => {
    const [ip, setIp] = useState({} as IP);
    const variant = "Danger";

    useEffect(() => {
        // loadAdd();
        setIp({ ip: "185.5.70.245" });
    }, []);

    const loadAdd = () => {
        axios
            .get("https://api.ipify.org/?format=json")
            .then((res) => {
                setIp(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {ip && (
                <>
                    <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === "light" ? "dark" : "white"}
                        className="mb-2 custom-card"
                    >
                        <Card.Header>
                            <FontAwesomeIcon icon={faAddressCard} /> IP Address
                        </Card.Header>{" "}
                        <Card.Body>
                            <Card.Title>{ip.ip}</Card.Title>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
};

export default Api;
