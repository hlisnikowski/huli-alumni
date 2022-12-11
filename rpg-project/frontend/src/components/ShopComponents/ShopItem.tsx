import React, { useState } from "react";
import { getIcon } from "../../utils/ImageHelper";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import silverCoin from "../../assets/game/items/Misc/Silver_Coin.png";
import goldenCoin from "../../assets/game/items/Misc/Golden_Coin.png";
import copperCoin from "../../assets/game/items/Misc/Copper_Coin.png";

import Tooltip from "./Tooltip";
import { getPrice, Item } from "../../utils/ItemHelper";

const ShopItem = (item: Item) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const price = getPrice(item);
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
                            src={getIcon(item)}
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
                        <img src={silverCoin} alt="" />
                        <p className="gold">{price[1]}</p>
                        <img src={copperCoin} alt="" />
                        <p className="silver">{price[0]}</p>
                    </div>
                    {showTooltip && (
                        <>
                            <Tooltip item={item} top={"-234px"} left={"60px"} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShopItem;
