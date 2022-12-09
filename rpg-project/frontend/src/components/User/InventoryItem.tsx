import React, { useState } from "react";
import { getIcon } from "../../utils/ImageHelper";

type InvProp = {
    num: number;
};

const InventoryItem = ({ num }: InvProp) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <>
            <img
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="shop-icon"
                src={getIcon(num)}
            />
        </>
    );
};

export default InventoryItem;
