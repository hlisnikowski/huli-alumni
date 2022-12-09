import React from "react";
import ShopItem from "./ShopItem";
import "../../style/shop.css";

export type ShopItemMo = {
    item_name: string;
    silver: number;
    gold: number;
    id: number;
    rarity: number;
};

const Shop = () => {
    const shopItems: ShopItemMo[] = [
        {
            item_name: "Red Potion",
            silver: 15,
            gold: 0,
            id: 0,
            rarity: 1,
        },
        {
            item_name: "Blue Potion",
            silver: 20,
            gold: 2,
            id: 1,
            rarity: 1,
        },
        {
            item_name: "Yellow Potion",
            silver: 20,
            gold: 2,
            id: 2,
            rarity: 1,
        },
        {
            item_name: "Iron Helmet",
            silver: 20,
            gold: 2,
            id: 3,
            rarity: 1,
        },
        {
            item_name: "Golden Ingot",
            silver: 15,
            gold: 2,
            id: 4,
            rarity: 1,
        },
        {
            item_name: "Leather Bag",
            silver: 15,
            gold: 2,
            id: 5,
            rarity: 1,
        },
    ];

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
