import React from "react";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../hooks/UserContext";
import "../../style/spell.css";
import { api, cfg } from "../../utils/Api";
import { getBuffIcon, getIcon, getSpellIcon } from "../../utils/ImageHelper";
import { getItem } from "../../utils/ItemHelper";
import { getSpellCount, Spell, Spellbook } from "../../utils/SpellHelper";
import { TooltipPrice } from "../ShopComponents/Tooltip";

const SpellMenu = () => {
    const { spells, spellbook, setupSpells } = useUserContext();

    return (
        <div className="mt-5">
            <div className="item-list">
                {spells &&
                    spells.map((spell, index) => (
                        <SpellCard setupSpells={setupSpells} key={index} spell={spell} spellbook={spellbook} />
                    ))}
            </div>
        </div>
    );
};

type SpellCardProp = {
    spell: Spell;
    spellbook: Spellbook[];
    setupSpells: () => void;
};

const SpellCard = ({ spell, spellbook, setupSpells }: SpellCardProp) => {
    const equip = (vnum: number, type: number) => {
        api.post(
            "/user/equip-spell",
            {
                vnum,
                type,
            },
            cfg()
        )
            .then((res) => {
                setupSpells();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="spell-card">
            <div className="left">
                <div className="spell-card-top">
                    <img className="spell-icon" src={getSpellIcon(spell.vnum)} />
                    <div>
                        <p className="spell-name sh">{spell.spell_name}</p>
                        <p className="spell-mana sh">Mana : {spell.mana_usage}</p>
                        <p className="spell-chance sh">Chance : {spell.trigger_chance}%</p>
                    </div>
                </div>

                <div className="shop-info">
                    <p>{spell.description}</p>
                </div>
                <Button
                    onClick={() => equip(spell.vnum, spell.type)}
                    variant="success"
                    className="c-btn btn-buy btn-spell"
                >
                    <p className="btn-name">EQUIP</p>
                </Button>
            </div>
            <div className="right">
                <div className="d-flex justify-content-center">
                    <p className="spell-cost sh">Cost:</p>
                    <img className="spell-cost-icon sh" src={getSpellIcon(spell.vnum)} alt="" />
                    <p className="spell-cost-count sh">
                        {getSpellCount(spell.type, spellbook)}/{spell.same_card_count}
                    </p>
                </div>
                <div className="spell-recipe">
                    <img
                        className="spell-recipe-icon"
                        src={getIcon(
                            getItem({
                                vnum: 1,
                                hash: "123",
                            })
                        )}
                        alt=""
                    />
                </div>

                <TooltipPrice price={10155} content={"center"} ml={"0px"} />
                <div
                    style={{ marginTop: "0px", marginBottom: "2px", borderBottom: "3px solid #1B0000" }}
                    className="bar-line"
                ></div>
                <Button variant="success" style={{ marginLeft: "20%" }} className="c-btn btn-buy">
                    <p className="btn-name">UPGRADE</p>
                </Button>
            </div>
        </div>
    );
};

export default SpellMenu;
