import React from "react";

import "../../style/userbar.css";
import sc from "../../assets/game/items/Misc/Silver_Coin.png";
import gc from "../../assets/game/items/Misc/Golden_Coin.png";

const UserBar = () => {
    return (
        <div className="top-bar">
            <div className="user-info">
                <p className="name-tag">Mirek</p>
                <img className="left" src={gc} alt="" />
                <p>1</p>
                <img src={sc} alt="" />
                <p>25</p>
            </div>
        </div>
    );
};

export default UserBar;
