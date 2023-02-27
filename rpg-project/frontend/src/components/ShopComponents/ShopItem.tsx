import React, { ReactNode, useState } from "react";
import { getIcon } from "../../utils/ImageHelper";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import silverCoin from "../../assets/game/items/Misc/Silver_Coin.png";
import goldenCoin from "../../assets/game/items/Misc/Golden_Coin.png";
import copperCoin from "../../assets/game/items/Misc/Copper_Coin.png";

import Tooltip, { TooltipPrice } from "./Tooltip";
import { getPrice, Item } from "../../utils/ItemHelper";
import { api, cfg } from "../../utils/Api";
import { useUserContext } from "../../hooks/UserContext";

const ShopItem = (item: Item) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const price = getPrice(item.price);
    const { setupInventory } = useUserContext();

    const buy = (e: React.MouseEvent) => {
        api.post(
            "/shop/buy",
            {
                vnum: item.vnum,
            },
            cfg()
        )
            .then((res) => {
                setupInventory();
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                    <div
                        style={{ marginBottom: "5px", marginTop: "12px", borderBottom: "3px solid #1B0000" }}
                        className="h-line bar-line"
                    ></div>

                    <TooltipPrice price={item.price} ml={"0px"} content={"center"} />
                </div>
                <div className="shop-chain"></div>
                <div className="shop-buy">
                    <Button onClick={(e) => buy(e)} variant="success" type="submit" className="mb-2 c-btn btn-buy">
                        <p className="btn-name">
                            <FontAwesomeIcon className="icon" icon={faCoins} /> Buy
                        </p>
                    </Button>

                    {showTooltip && (
                        <>
                            <Tooltip item={item} top={"-264px"} left={"60px"} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShopItem;
