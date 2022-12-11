import React, { useEffect, useState } from "react";
import ShopItem from "./ShopItem";
import "../../style/shop.css";
import { getItem, getItems, Item, ItemData } from "../../utils/ItemHelper";

const Shop = () => {
    const [shopItems, setShopItems] = useState<Item[]>([]);
    useEffect(() => {
        const mock: ItemData[] = [
            {
                vnum: 1,
                hash: "hash123",
            },
            {
                vnum: 2,
                hash: "hash321",
            },
        ];
        setShopItems(getItems(mock));
    }, []);

    return (
        <>
            <div className="mt-5">
                <div className="item-list">
                    {shopItems && shopItems.map((item, index) => <ShopItem key={index} {...item} />)}
                </div>
            </div>
        </>
    );
};

export default Shop;
