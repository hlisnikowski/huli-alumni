import { config } from "@fortawesome/fontawesome-svg-core";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { api, cfg } from "../utils/Api";
import { addEquipmentEmptySlots, getEmpty, getPrice, ItemData } from "../utils/ItemHelper";
import { getSpellByVnum, getSpells, SkillData, Spell, Spellbook } from "../utils/SpellHelper";
import { Stats } from "../utils/UIHelper";

type UserContextProviderProps = {
    children: ReactNode;
};

type UserCtx = {
    setupInventory: () => void;
    setupSpells: () => void;
    bag: ItemData[];
    setBag: Dispatch<SetStateAction<ItemData[]>>;
    equip: ItemData[];
    setEquip: Dispatch<SetStateAction<ItemData[]>>;
    spells: Spell[];
    spellbook: Spellbook[];
    money: number;
    tab: string;
    setTab: Dispatch<SetStateAction<string>>;
    spell: Spell | undefined;
    stats: Stats;
};

export const UserContext = createContext({} as UserCtx);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: UserContextProviderProps) => {
    const [bag, setBag] = useState([] as ItemData[]);
    const [equip, setEquip] = useState([] as ItemData[]);

    // Spells that user learned
    const [spells, setSpells] = useState([] as Spell[]);
    // Spells that user have in inventory
    const [spellbook, setSpellbook] = useState([] as Spellbook[]);
    // Spell that user is currently using
    const [spell, setSpell] = useState({} as Spell | undefined);

    const [money, setMoney] = useState<number>(0);
    const [stats, setStats] = useState<Stats>({} as Stats);

    // Which window is currently open
    const [tab, setTab] = useState("adventure");

    useEffect(() => {
        if (localStorage.getItem("login") == "true") {
            console.log("User Context Called");
            setupInventory();
            setupSpells();
        }
    }, []);

    function setupInventory() {
        console.log("Inventory Loaded");
        api.get("/user/inventory", cfg())
            .then((res) => {
                setBag(res.data.inventory);
                setEquip(addEquipmentEmptySlots(res.data.equipment));
                setMoney(res.data.money);
                setStats(res.data.stats);
            })
            .catch((err) => console.log(err));
    }

    function setupSpells() {
        api.get("/user/skill", cfg())
            .then((res) => {
                setSpells(getSpells(res.data.spells));
                setSpellbook(res.data.spellbook);
                setSpell(getSpellByVnum(res.data.spell));
            })
            .catch((err) => console.log(err));
    }

    return (
        <UserContext.Provider
            value={{
                setupInventory,
                bag,
                setBag,
                equip,
                setEquip,
                money,
                tab,
                setTab,
                spells,
                setupSpells,
                spellbook,
                spell,
                stats,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
