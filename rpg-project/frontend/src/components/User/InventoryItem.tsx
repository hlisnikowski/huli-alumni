import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUserContext } from "../../hooks/UserContext";
import { api, cfg } from "../../utils/Api";
import { getIcon, ITEMTYPE } from "../../utils/ImageHelper";
import { isItemPlaceholder, Item, ItemData, ITEM_TYPE, MAX_VNUM } from "../../utils/ItemHelper";
import Tooltip from "../ShopComponents/Tooltip";
import { TooltipPosition } from "./Inventory";

type InvProp = {
    data: ItemData;
    item: Item;
    setTool: Dispatch<SetStateAction<TooltipPosition>>;
    button_type: string;
    setItem: Dispatch<SetStateAction<Item>>;
};

// data will be used later with interaction
const InventoryItem = ({ data, item, setTool, button_type, setItem }: InvProp) => {
    const { setupInventory } = useUserContext();

    // Show mouse pointer if item is not placeholder
    const isPlaceholder = isItemPlaceholder(data);
    const cursor = isPlaceholder ? "auto" : "pointer";
    // Button name also
    const canSell = button_type === "Equip";
    const canUse = item.type === ITEM_TYPE.POTION;

    // MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        if (!isPlaceholder) setShow(true);
    };

    const interact = (e: React.MouseEvent) => {
        e.preventDefault();
        // If item is in the equipment
        if (!canSell) {
            return unequip();
            // If item is in the bag
        } else {
            // If item is potion
            if (canUse) return use();
            else equip();
        }
    };

    const unequip = () => {
        console.log(`Unequip item: ${item.item_name} : ${item.vnum} : ${data.hash}`);
    };

    const sell = (e: React.MouseEvent) => {
        e.preventDefault();
        api.post(
            "/user/sell",
            {
                hash: data.hash,
                vnum: data.vnum,
            },
            cfg()
        )
            .then((res) => {
                handleClose();
                setupInventory();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const equip = () => {
        console.log(`Equip item: ${item.item_name} : ${item.vnum} : ${data.hash}`);
    };

    const use = () => {
        console.log(`Using item: ${item.item_name} : ${item.vnum} : ${data.hash}`);
    };

    return (
        <>
            <img
                style={{ cursor: cursor }}
                onMouseEnter={() => setItem(item)}
                onMouseLeave={() => {
                    setItem({} as Item);
                    if (!canSell)
                        setTool({
                            x: "11px",
                            y: "455px",
                        } as TooltipPosition);
                    else {
                        setTool({
                            x: "10px",
                            y: "170px",
                        } as TooltipPosition);
                    }
                }}
                className="shop-icon"
                src={getIcon(item)}
                onClick={() => handleShow()}
            />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{item.item_name}</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="c-btn menu-btn btn-buy">
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => interact(e)} className="c-btn menu-btn btn-buy">
                        {canUse ? "Use" : button_type}
                    </Button>
                    {canSell && (
                        <Button variant="primary" onClick={(e) => sell(e)} className="c-btn menu-btn btn-buy">
                            Sell
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InventoryItem;
