import React, { useMemo } from "react";
import { useUserContext } from "../hooks/UserContext";
import { VIEW } from "../pages/UserPage";
import Adventure from "./AdventureComponents/Adventure";
import Shop from "./ShopComponents/Shop";
import SpellMenu from "./SpellComponents/SpellMenu";

const GameWindow = () => {
    const { tab } = useUserContext();

    const setView = useMemo(() => {
        switch (tab) {
            case VIEW.ADVENTURE:
                return <Adventure />;
            case VIEW.SHOP:
                return <Shop />;
            case VIEW.SPELL:
                return <SpellMenu />;
        }
    }, [tab]);

    return <div className="tabs">{setView}</div>;
};

export default GameWindow;
