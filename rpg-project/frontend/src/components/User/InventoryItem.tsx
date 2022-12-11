import React, { useState } from "react";
import { getIcon } from "../../utils/ImageHelper";
import { Item, ItemData, MAX_VNUM } from "../../utils/ItemHelper";
import Tooltip from "../ShopComponents/Tooltip";

type InvProp = {
    data: ItemData;
    item: Item;
};

// data will be used later with interaction
const InventoryItem = ({ data, item }: InvProp) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const cursor = item.vnum >= 20000 ? "auto" : "pointer";

    return (
        <>
            <img
                style={{ cursor: cursor }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="shop-icon"
                src={getIcon(item)}
            />
            {showTooltip && item.vnum < MAX_VNUM && (
                <>
                    <Tooltip item={item} top={"-0px"} left={"242px"} />
                </>
            )}
        </>
    );
};

export default InventoryItem;
