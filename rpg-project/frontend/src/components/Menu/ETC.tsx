import React from "react";
import { Button } from "react-bootstrap";
import "../../style/etc.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ETC = () => {
    return (
        <div className="etc-container win">
            <Button className="c-btn">
                <FontAwesomeIcon className="" icon={faUser} />
            </Button>
        </div>
    );
};

export default ETC;
