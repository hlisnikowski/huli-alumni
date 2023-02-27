import React from "react";

import "../../style/tooltip.css";
import { getPrice, getSellPrice, Item } from "../../utils/ItemHelper";
import g_img from "../../assets/game/items/Misc/gold.png";
import s_img from "../../assets/game/items/Misc/silver.png";
import c_img from "../../assets/game/items/Misc/copper.png";

type TooltipProp = {
    item: Item;
    top: string;
    left: string;
};

const getStatus = (prop: Item, type: string) => {
    switch (type) {
        case "hp":
            if (prop.hp && prop.hp > 0) {
                return <p>HP: {prop.hp}</p>;
            }
            break;
        case "def":
            if (prop.def && prop.def > 0) {
                return <p>DEF: {prop.def}</p>;
            }
            break;
        case "crit":
            if (prop.crit && prop.crit > 0) {
                return <p>CRIT: {prop.crit}%</p>;
            }
            break;
        case "atk":
            if (prop.atk && prop.atk > 0) {
                return <p>ATK: {prop.atk}</p>;
            }
            break;
    }
};

const Tooltip = ({ item, top, left }: TooltipProp) => {
    return (
        <div style={{ left: left, top: top }} className="item-tooltip">
            <p className="shop-name tt-name sh">{item.item_name}</p>
            <div className="h-line" style={{ borderBottom: "3px solid #1B0000" }}></div>
            <div className="tt-desc">
                {getStatus(item, "hp")}
                {getStatus(item, "atk")}
                {getStatus(item, "def")}
                {getStatus(item, "crit")}
            </div>
            <TooltipSellPrice {...item} />
        </div>
    );
};

export const TooltipSellPrice = (item: Item) => {
    const [copper, silver, gold] = getSellPrice(item);
    return (
        <div style={{ justifyContent: "center" }} className="d-flex tt-bottom">
            <img className="tt-price" src={g_img} />
            <p className="shop-name tt-name sh">{gold}</p>
            <img className="tt-price " src={s_img} />
            <p className="shop-name tt-name sh">{silver}</p>
            <img className="tt-price " src={c_img} />
            <p className="shop-name tt-name sh">{copper}</p>
        </div>
    );
};

type TooltipPriceProp = {
    price: number;
    ml: string;
    content: string;
};

export const TooltipPrice = ({ price, ml, content }: TooltipPriceProp) => {
    const [copper, silver, gold] = getPrice(price);
    return (
        <div style={{ marginLeft: ml, justifyContent: content }} className="d-flex tt-bottom">
            <img className="tt-price" src={g_img} />
            <p className="shop-name tt-name sh">{gold}</p>
            <img className="tt-price " src={s_img} />
            <p className="shop-name tt-name sh">{silver}</p>
            <img className="tt-price " src={c_img} />
            <p className="shop-name tt-name sh">{copper}</p>
        </div>
    );
};

export default Tooltip;
