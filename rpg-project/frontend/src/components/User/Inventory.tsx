import React, { useState } from "react";
import "../../style/inventory.css";
import { getIcon } from "../../utils/ImageHelper";
import InventoryItem from "./InventoryItem";

export const Inventory = () => {
    const rnd = (): number => {
        return Math.floor(Math.random() * 7);
    };

    return (
        <div className="mt-2 inv">
            <p className="inv-title">Equipment</p>
            <div className="inv-equip">
                <InventoryItem num={9} />
                <InventoryItem num={7} />
                <InventoryItem num={5} />
                <InventoryItem num={6} />
                <InventoryItem num={3} />
                <InventoryItem num={4} />
                <InventoryItem num={2} />
                <InventoryItem num={8} />
            </div>
            <p className="inv-title">Bag</p>
            <div className="inv-bag">
                <InventoryItem num={0} />
                <InventoryItem num={10} />
                <InventoryItem num={11} />
                <InventoryItem num={1} />
            </div>
            <div className="inv-slots">
                <p>17/20</p>
            </div>
        </div>
    );
};
