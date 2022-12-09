import React, { useState } from "react";
import { getIcon } from "../../utils/ImageHelper";
import { ShopItemMo } from "./Shop";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import silverCoin from "../../assets/game/items/Misc/Silver_Coin.png";
import goldenCoin from "../../assets/game/items/Misc/Golden_Coin.png";
import Tooltip from "./Tooltip";

const ShopItem = (item: ShopItemMo) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const tooltip = () => {};

    return (
        <>
            <div className="shop-item">
                <div className="shop-card">
                    <div className="shop-card-top">
                        <img
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="shop-icon"
                            src={getIcon(item.id)}
                        />

                        <p className="shop-name">{item.item_name}</p>
                    </div>

                    <div className="shop-info">
                        <p>Placeholder for item description</p>
                    </div>
                </div>
                <div className="shop-chain"></div>
                <div className="shop-buy">
                    <Button variant="success" type="submit" className="mb-2 w-100 c-btn menu-btn btn-buy">
                        <p className="btn-name">
                            {" "}
                            <FontAwesomeIcon className="icon" icon={faCoins} /> Buy
                        </p>
                    </Button>
                    <div className="coins">
                        <img src={goldenCoin} alt="" />
                        <p className="gold">{item.gold}</p>
                        <img src={silverCoin} alt="" />
                        <p className="silver">{item.silver}</p>
                    </div>
                    {showTooltip && (
                        <>
                            <Tooltip />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShopItem;
