import React, { useMemo, useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import xp_fill from "../../assets/game/ui/xp_fill.png";
import hp_fill from "../../assets/game/ui/hp-fill.png";
import mana_fill from "../../assets/game/ui/mana_fill.png";
import coins_ph from "../../assets/game/ui/coins_ph.png";
import coin_ph from "../../assets/game/ui/coin_ph.png";
import "../../style/inventory.css";
import { api, cfg } from "../../utils/Api";
import { getSpellIcon } from "../../utils/ImageHelper";
import { getItem, Item, MAX_VNUM } from "../../utils/ItemHelper";
import { getSpellShadow } from "../../utils/SpellHelper";
import Tooltip from "../ShopComponents/Tooltip";
import InventoryItem from "./InventoryItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { EXP, getBarValue } from "../../utils/UIHelper";

export type TooltipPosition = {
    x: string;
    y: string;
};

type InventoryProp = {
    win: string;
};

export const Inventory = ({ win }: InventoryProp) => {
    const { equip, bag, spell, setupInventory, stats } = useUserContext();

    const [selectedItem, setSelectedItem] = useState({} as Item);
    const [tool, setTool] = useState({} as TooltipPosition);

    const spellShadow = useMemo(() => {
        return getSpellShadow(spell?.type);
    }, [spell]);

    const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
    };

    const onDropItem = (e: React.DragEvent<HTMLDivElement>, path: string) => {
        const vnum = Number(e.dataTransfer.getData("vnum"));
        const subtype = Number(e.dataTransfer.getData("subtype"));
        const hash = e.dataTransfer.getData("hash");
        const storage = e.dataTransfer.getData("storage");

        if (path === "sell" && storage === "bag") {
            if (vnum && hash) {
                sell(hash, vnum);
                return;
            }
        }

        if (path === "sell-all" && storage === "bag") {
            console.log(vnum);
            if (vnum) {
                sellAll(vnum);
                return;
            }
        }

        // If we place item on the same spot
        if (path === "equip" && storage === "inventory") return;
        if (path === "unequip" && storage === "bag") return;

        if (vnum && subtype && hash && subtype > 0)
            api.post(
                "/user/" + path,
                {
                    vnum,
                    hash,
                    subtype,
                },
                cfg()
            )
                .then((res) => {
                    setupInventory();
                })
                .catch((err) => {
                    console.log(err);
                });
    };

    const sell = (hash: string, vnum: number) => {
        api.post(
            "/user/sell",
            {
                hash,
                vnum,
            },
            cfg()
        )
            .then((res) => {
                setupInventory();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const sellAll = (vnum: number) => {
        api.post(
            "/user/sell-all",
            {
                vnum,
            },
            cfg()
        )
            .then((res) => {
                setupInventory();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div hidden={win != "profile"} className="profile win">
                <p className="inv-title">Profile</p>
                <div
                    style={{ marginBottom: "5px", marginTop: "15px", borderBottom: "3px solid #1B0000" }}
                    className="h-line bar-line"
                ></div>
                <p style={{ margin: "0px 0 -8px 0" }} className="title dashed sh">
                    Level: {stats.level}
                </p>

                <div className="xp">
                    <div className="hp-bar sh">
                        <img
                            style={{ width: getBarValue(stats.hp, stats.max_hp) }}
                            className="hp-fill"
                            src={hp_fill}
                            alt=""
                        />
                    </div>
                    <p className="sh mb-2">
                        {stats.hp}/{stats.max_hp}
                    </p>
                </div>

                <div className="xp">
                    <div className="mana-bar sh">
                        <img
                            style={{ width: getBarValue(stats.mana, stats.max_mana) }}
                            className="mana-fill"
                            src={mana_fill}
                            alt=""
                        />
                    </div>

                    <p className="sh mb-2">
                        {stats.mana}/{stats.max_mana}
                    </p>
                </div>

                <div className="xp">
                    <div className="xp-bar sh">
                        <img
                            style={{ width: getBarValue(stats.exp, EXP[stats.level]) }}
                            className="xp-fill"
                            src={xp_fill}
                            alt=""
                        />
                    </div>

                    <p className="sh mb-2">
                        {stats.exp}/{EXP[stats.level]}
                    </p>
                </div>

                <div
                    style={{ marginBottom: "5px", marginTop: "15px", borderBottom: "3px solid #1B0000" }}
                    className="h-line bar-line"
                ></div>

                <div className="profile-stats sh">
                    <div>
                        <p className="ca">ATK:{stats.atk}</p>
                        <p className="cb">DEF:{stats.def}</p>
                    </div>
                    <div>
                        <p className="cr">HP:{stats.max_hp}</p>
                        <p className="cp">CRIT:{stats.crit}%</p>
                    </div>
                </div>
                <div
                    style={{ marginTop: "0px", marginBottom: "20px", borderBottom: "3px solid #1B0000" }}
                    className="h-line bar-line"
                ></div>

                <div style={{ boxShadow: spellShadow }} className="inv-spell mt-2">
                    {spell && <img className="inv-spell-icon" src={getSpellIcon(spell.vnum)} alt="" />}
                </div>

                <p style={{ marginTop: "-10px" }} className="title sh">
                    SPELL
                </p>
            </div>

            <div className="mt-2 inv">
                <p className="inv-title">Equipment</p>
                <div
                    onDrop={(e) => onDropItem(e, "equip")}
                    onDragOver={(e) => allowDrop(e)}
                    style={{ position: "relative" }}
                    className="inv-equip"
                >
                    {equip.length > 0 &&
                        equip.map((i, index) => (
                            <InventoryItem
                                button_type="Unequip"
                                setTool={setTool}
                                key={index}
                                data={i}
                                item={getItem(i)}
                                setItem={setSelectedItem}
                                storage={"inventory"}
                            />
                        ))}
                </div>

                <p className="inv-title">Bag</p>

                <div
                    onDrop={(e) => onDropItem(e, "unequip")}
                    onDragOver={(e) => allowDrop(e)}
                    style={{ position: "relative" }}
                    className="inv-bag"
                >
                    {bag.length > 0 &&
                        bag.map((i) => {
                            return (
                                <InventoryItem
                                    button_type="Equip"
                                    setTool={setTool}
                                    key={i.hash}
                                    data={i}
                                    item={getItem(i)}
                                    setItem={setSelectedItem}
                                    storage={"bag"}
                                />
                            );
                        })}
                </div>

                <div className="inv-slots">
                    <p>{bag.length > 0 ? bag.length : 0}/20</p>
                </div>
                <div className="d-flex sell">
                    <div
                        onDrop={(e) => onDropItem(e, "sell-all")}
                        onDragOver={(e) => allowDrop(e)}
                        style={{ position: "relative", backgroundImage: `url(${coins_ph})` }}
                        className="sell-slots"
                    ></div>
                    <div
                        onDrop={(e) => onDropItem(e, "sell")}
                        onDragOver={(e) => allowDrop(e)}
                        style={{ position: "relative", backgroundImage: `url(${coin_ph})` }}
                        className="sell-slots"
                    ></div>
                </div>

                {selectedItem && selectedItem.vnum < MAX_VNUM && tool && (
                    <>
                        <Tooltip item={selectedItem} top={tool.y} left={tool.x} />
                    </>
                )}
            </div>
        </>
    );
};
