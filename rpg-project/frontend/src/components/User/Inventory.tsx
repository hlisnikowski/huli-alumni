import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import "../../style/inventory.css";
import { api, cfg } from "../../utils/Api";
import { getIcon } from "../../utils/ImageHelper";
import { addEquipmentEmptySlots, getItem, Item, ItemData, MAX_VNUM } from "../../utils/ItemHelper";
import Tooltip from "../ShopComponents/Tooltip";
import InventoryItem from "./InventoryItem";

export type TooltipPosition = {
    x: string;
    y: string;
};

export const Inventory = () => {
    const { equip, bag } = useUserContext();
    const [selectedItem, setSelectedItem] = useState({} as Item);
    const [tool, setTool] = useState({} as TooltipPosition);

    // pos={{ x: "2px", y: "125px" }}
    // pos={{ x: "2px", y: "-349px" }}
    return (
        <div className="mt-2 inv">
            <p className="inv-title">Equipment</p>
            <div style={{ position: "relative" }} className="inv-equip">
                {equip.length > 0 &&
                    equip.map((i, index) => (
                        <InventoryItem
                            button_type="Unequip"
                            setTool={setTool}
                            key={index}
                            data={i}
                            item={getItem(i)}
                            setItem={setSelectedItem}
                        />
                    ))}
            </div>
            <p className="inv-title">Bag</p>
            <div style={{ position: "relative" }} className="inv-bag">
                {bag.length > 0 &&
                    bag.map((i, index) => (
                        <InventoryItem
                            button_type="Equip"
                            setTool={setTool}
                            key={index}
                            data={i}
                            item={getItem(i)}
                            setItem={setSelectedItem}
                        />
                    ))}
            </div>

            <div className="inv-slots">
                <p>{bag.length > 0 ? bag.length : 0}/20</p>
            </div>
            {selectedItem && selectedItem.vnum < MAX_VNUM && (
                <>
                    <Tooltip item={selectedItem} top={tool.y} left={tool.x} />
                </>
            )}
        </div>
    );
};
