import React, { useEffect, useMemo, useState } from "react";
import ShopItem from "./ShopItem";

import { getItem, getItems, Item, ItemData } from "../../utils/ItemHelper";
import { useUserContext } from "../../hooks/UserContext";

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
            {
                vnum: 3,
                hash: "hash321",
            },
            {
                vnum: 4,
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
