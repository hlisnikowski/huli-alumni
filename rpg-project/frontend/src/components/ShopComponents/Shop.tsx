import React from "react";
import ShopItem from "./ShopItem";
import "../../style/shop.css";
import { shopItems } from "../../utils/MockedData";

export type ShopItemMo = {
    item_name: string;
    silver: number;
    gold: number;
    id: number;
    rarity: number;
};

const Shop = () => {
    return (
        <>
            <div className="mt-5">
                <div className="item-list">
                    {shopItems.map((item, index) => (
                        <ShopItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;
