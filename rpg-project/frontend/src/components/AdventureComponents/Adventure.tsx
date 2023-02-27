import { Button, Modal } from "react-bootstrap";
import "../../style/adventure.css";
import { EQUIP_ID, getBuffIcon, getIcon } from "../../utils/ImageHelper";
import { getEmpty, getItem, Item, ITEM_TYPE, ITEM_VNUM } from "../../utils/ItemHelper";
import { getLoot, getLootData, getLootPrice } from "../../utils/LootHelper";
import Tooltip, { TooltipPrice } from "../ShopComponents/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TooltipPosition } from "../User/Inventory";
import { useEntityContext } from "../../hooks/EntityContext";
import { Entity, getEntityIcon, getMapIcon } from "../../utils/EntityHelper";
import { api, cfg } from "../../utils/Api";
import { useUserContext } from "../../hooks/UserContext";

const Adventure = () => {
    const { entities } = useEntityContext();

    return (
        <div className="mt-5">
            <div className="entity-list">
                {entities && entities.map((e, index) => <EntityCard key={index} entity={e} />)}
            </div>
        </div>
    );
};

type EntityProp = {
    entity: Entity;
};

type FightResult = {
    fight: {
        status: string;
        type: string;
        player: boolean;
    }[];
    loot: number[];
    money: number;
    won: string;
};

const EntityCard = ({ entity }: EntityProp) => {
    // const lootdata = getLootData(entity.loot);
    const loots = getLoot(entity.loot);
    const [selectedItem, setSelectedItem] = useState({} as Item);
    const [tool, setTool] = useState({} as TooltipPosition);
    const { setupInventory } = useUserContext();
    const [fr, setFight] = useState({} as FightResult);

    // MODAL
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    const fight = () => {
        console.log("Fight");
        api.get("/entity/fight/" + entity.vnum, cfg())
            .then((s) => {
                // console.log(s.data);
                setFight(s.data);
                handleShow();
                setupInventory();
            })
            .catch((e) => console.log(e));
    };

    return (
        <>
            <div className="adv">
                <div className="entity-card d-flex">
                    <img
                        style={{ backgroundImage: `url("${getMapIcon(entity.map)}")` }}
                        className="entity-icon"
                        src={getEntityIcon(entity.vnum)}
                        alt=""
                    />
                    <div className="entity-loot">
                        {loots &&
                            loots.map((loot, index) => (
                                <img className="entity-loot-icon" key={index} src={getIcon(loot)} alt="" />
                            ))}
                    </div>
                    <div className="d-inline">
                        <Button onClick={() => fight()} className="c-btn entity-btn">
                            {entity.energy}
                            <FontAwesomeIcon className="icon" icon={faBolt} /> Fight
                        </Button>
                        <div className="entity-stats">
                            <div>
                                <p className="ca">ATK:{entity.atk}</p>
                                <p className="cb">DEF:{entity.def}</p>
                            </div>
                            <div>
                                <p className="cr">HP:{entity.hp}</p>
                                <p className="cp">CRIT:{entity.crit}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="entity-money">
                        <p className="entity-name sh">
                            {entity.name} | Lv.{entity.level}
                        </p>
                        <TooltipPrice price={getLootPrice(entity.vnum)} ml={"0px"} content={"flex-start"} />
                    </div>
                </div>
                {selectedItem.item_name && <Tooltip item={selectedItem} top={tool.y} left={tool.x} />}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: fr.won === "Victory" ? "#e2c12f" : "#e43e29" }}>
                            {fr.won}!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="fight">
                            <p className="fight-title">Scenario</p>
                            <div className="fight-result">
                                {fr.fight &&
                                    fr.fight.map((f, index) => {
                                        // If we are on the last line
                                        if (index == fr.fight.length - 1)
                                            return (
                                                <p
                                                    style={{ textAlign: "center", borderTop: "2px solid black" }}
                                                    key={index}
                                                >
                                                    {f.status}
                                                </p>
                                            );
                                        else
                                            return (
                                                <div key={index} className="d-flex">
                                                    <img className="buff-icon sh" src={getBuffIcon(f.type)} alt="" />
                                                    <pre className={f.player ? "fight-player" : "fight-entity"}>
                                                        {f.status}
                                                    </pre>
                                                </div>
                                            );
                                    })}
                            </div>
                            <p className="fight-title">Loot</p>
                            <div className="fight-loot">
                                {fr.loot &&
                                    fr.loot.map((item, index) => {
                                        return (
                                            <img
                                                key={index}
                                                className="entity-loot-icon"
                                                src={getIcon(
                                                    getItem({
                                                        vnum: item,
                                                        hash: "123",
                                                        atk: 0,
                                                        def: 0,
                                                        crit: 0,
                                                        hp: 0,
                                                    })
                                                )}
                                                alt=""
                                            />
                                        );
                                    })}
                            </div>
                            <p className="fight-title">Money</p>
                            <TooltipPrice price={fr.money} ml={"0px"} content={"center"} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} className="c-btn  btn-buy">
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

// LOOT IMG HAS NO TOOLTIP BCS OF RANDOMNESS

// onMouseEnter={(e) => {
//     setSelectedItem(loot);
//     let bounds = e.currentTarget.getBoundingClientRect();
//     let offsetY = 0;
//     // If our tooltip is wouldn't fit in screen height
//     if (bounds.top > 750) offsetY = bounds.top - 750;
//     if (bounds.top < 180) offsetY = -1 * (180 - bounds.top);

//     setTool({
//         x: bounds.left + 65 + "px",
//         y: bounds.top + -150 - offsetY + "px",
//     } as TooltipPosition);
// }}
// onMouseLeave={() => {
//     setSelectedItem({} as Item);
// }}

export default Adventure;
