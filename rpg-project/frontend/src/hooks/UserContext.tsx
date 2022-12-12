import { config } from "@fortawesome/fontawesome-svg-core";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { api, cfg } from "../utils/Api";
import { addEquipmentEmptySlots, ItemData } from "../utils/ItemHelper";

type UserContextProviderProps = {
    children: ReactNode;
};

type UserCtx = {
    setupInventory: () => void;
    bag: ItemData[];
    setBag: Dispatch<SetStateAction<ItemData[]>>;
    equip: ItemData[];
    setEquip: Dispatch<SetStateAction<ItemData[]>>;
};

export const UserContext = createContext({} as UserCtx);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: UserContextProviderProps) => {
    const [inventory, setInventory] = useState();
    const [bag, setBag] = useState([] as ItemData[]);
    const [equip, setEquip] = useState([] as ItemData[]);

    useEffect(() => {
        setupInventory();
    }, []);

    function setupInventory() {
        console.log("Inventory Loaded");
        api.get("/user/inventory", cfg())
            .then((res) => {
                setBag(res.data.inventory);
                setEquip(addEquipmentEmptySlots(res.data.equipment));
            })
            .catch((err) => console.log(err));
    }

    return (
        <UserContext.Provider value={{ setupInventory, bag, setBag, equip, setEquip }}>{children}</UserContext.Provider>
    );
};
