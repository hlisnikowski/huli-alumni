import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrin, faRotate, faGamepad, faUser, faCoins, faSearch, faTag } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import "../styles/joke.css";

type National = {
    country: Country[];
};

type Country = {
    country_id: string;
    probability: number;
};

const NameSearch = () => {
    const [nat, setNat] = useState({} as National);
    const [name, setName] = useState("");

    const variant = "Danger";

    useEffect(() => {
        loadName();
    }, []);

    const loadName = () => {
        axios
            .get("https://api.nationalize.io/?name=miroslav")
            .then((res) => {
                setNat(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const searchName = (e: React.MouseEvent) => {
        e.preventDefault();
        if (name.length < 1) return;
        axios
            .get("https://api.nationalize.io/?name=" + name.toLocaleLowerCase())
            .then((res) => {
                setNat(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {nat && (
                <>
                    <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === "light" ? "dark" : "white"}
                        className="mb-2 custom-card"
                    >
                        <Card.Header>
                            <FontAwesomeIcon icon={faTag} /> Name Probability
                        </Card.Header>{" "}
                        <Card.Body>
                            <input
                                placeholder="miroslav"
                                onChange={(e) => setName(e.currentTarget.value)}
                                className="mb-3 w-75 search"
                            />{" "}
                            <FontAwesomeIcon
                                onClick={(e) => {
                                    if (!name) return;
                                    searchName(e);
                                }}
                                style={{ cursor: "pointer" }}
                                icon={faSearch}
                            />
                            <div className="h-line mb-2"></div>
                            {nat.country &&
                                nat.country.map((ctr, index) => {
                                    return (
                                        <>
                                            <Card.Title key={index}>
                                                {" "}
                                                <FontAwesomeIcon icon={faUser} /> {ctr.country_id} {ctr.probability} %
                                            </Card.Title>
                                        </>
                                    );
                                })}
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
};

export default NameSearch;
