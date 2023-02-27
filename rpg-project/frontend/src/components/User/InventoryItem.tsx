import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUserContext } from "../../hooks/UserContext";
import { BAG_TOOLTIP_POS, EQUIP_TOOLTIP_POS } from "../../settings/Settings";
import { api, cfg } from "../../utils/Api";
import { getIcon, ITEMTYPE } from "../../utils/ImageHelper";
import { isItemPlaceholder, Item, ItemData, ITEM_TYPE, MAX_VNUM } from "../../utils/ItemHelper";
import { TooltipPosition } from "./Inventory";

type InvProp = {
    data: ItemData;
    item: Item;
    setTool: Dispatch<SetStateAction<TooltipPosition>>;
    button_type: string;
    setItem: Dispatch<SetStateAction<Item>>;
    storage: string;
};

// data will be used later with interaction
const InventoryItem = ({ data, item, setTool, button_type, setItem, storage }: InvProp) => {
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
        api.post(
            "/user/unequip",
            {
                vnum: data.vnum,
                subtype: item.subtype,
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

    const sell = (e: React.MouseEvent) => {
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

    const sellAll = (e: React.MouseEvent) => {
        api.post(
            "/user/sell-all",
            {
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
        api.post(
            "/user/equip",
            {
                vnum: data.vnum,
                hash: data.hash,
                subtype: item.subtype,
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

    const use = () => {
        console.log(`Using item: ${item.item_name} : ${item.vnum} : ${data.hash}`);
    };

    function drag(ev: React.DragEvent<HTMLImageElement>) {
        setItem({} as Item);
        ev.dataTransfer.setData("hash", data.hash);
        ev.dataTransfer.setData("vnum", data.vnum.toString());
        ev.dataTransfer.setData("subtype", item.subtype.toString());
        ev.dataTransfer.setData("storage", storage);
    }

    return (
        <>
            <img
                onDragStart={(e) => drag(e)}
                style={{ cursor: cursor }}
                onMouseEnter={() => {
                    if (data.vnum >= MAX_VNUM) return;
                    // canSell = Is equipment
                    if (!canSell) setTool(EQUIP_TOOLTIP_POS);
                    else {
                        setTool(BAG_TOOLTIP_POS);
                    }
                    setItem(item);
                }}
                onMouseLeave={() => {
                    if (data.vnum >= MAX_VNUM) return;
                    // To hide Tooltip
                    setItem({} as Item);
                }}
                className="shop-icon"
                src={getIcon(item)}
                onClick={() => handleShow()}
            />

            <Modal dialogClassName="custom-dialog" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{item.item_name}</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="c-btn  btn-buy">
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => interact(e)} className="c-btn btn-buy">
                        {canUse ? "Use" : button_type}
                    </Button>
                    {canSell && (
                        <>
                            <Button variant="primary" onClick={(e) => sell(e)} className="c-btn  btn-buy">
                                Sell
                            </Button>
                            <Button variant="primary" onClick={(e) => sellAll(e)} className="c-btn  btn-buy">
                                Sell All
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InventoryItem;
