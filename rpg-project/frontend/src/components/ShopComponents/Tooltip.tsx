import React from "react";

import "../../style/tooltip.css";
import { Item } from "../../utils/ItemHelper";

type TooltipProp = {
    item: Item;
    top: string;
    left: string;
};

const Tooltip = ({ item, top, left }: TooltipProp) => {
    return (
        <div style={{ left: left, top: top }} className="item-tooltip">
            <p className="shop-name tt-name sh">{item.item_name}</p>
            <div className="h-line" style={{ borderBottom: "3px solid #1B0000" }}></div>
            <div className="tt-desc">
                <p>Attack : 5</p>
                <p>Defense : 2</p>
                <p>Critic : 1</p>
                <p>Tooltip Placeholder</p>
            </div>
        </div>
    );
};

export default Tooltip;
