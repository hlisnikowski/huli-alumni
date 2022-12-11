import React, { useEffect, useState } from "react";
import "../../style/inventory.css";
import { api, cfg } from "../../utils/Api";
import { getIcon } from "../../utils/ImageHelper";
import { addEquipmentEmptySlots, getItem, getItems, Item, ItemData } from "../../utils/ItemHelper";
import InventoryItem from "./InventoryItem";

export const Inventory = () => {
    const [bag, setBag] = useState([] as ItemData[]);
    const [equip, setEquip] = useState([] as ItemData[]);

    useEffect(() => {
        api.get("/user/inventory", cfg())
            .then((res) => {
                setBag(res.data.inventory);
                setEquip(addEquipmentEmptySlots(res.data.equipment));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="mt-2 inv">
            <p className="inv-title">Equipment</p>
            <div style={{ position: "relative" }} className="inv-equip">
                {equip.length > 0 && equip.map((i, index) => <InventoryItem key={index} data={i} item={getItem(i)} />)}
            </div>
            <p className="inv-title">Bag</p>
            <div style={{ position: "relative" }} className="inv-bag">
                {bag.length > 0 && bag.map((i, index) => <InventoryItem key={index} data={i} item={getItem(i)} />)}
            </div>
            <div className="inv-slots">
                <p>{bag.length > 0 ? bag.length : 0}/20</p>
            </div>
        </div>
    );
};
