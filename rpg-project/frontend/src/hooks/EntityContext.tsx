import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Entity, getEntities } from "../utils/EntityHelper";

type EntityContextProviderProps = {
    children: ReactNode;
};

type EntityCtx = {
    setupEntity: () => void;
    entities: Entity[];
    setEntities: Dispatch<SetStateAction<Entity[]>>;
};

export const EntityContext = createContext({} as EntityCtx);
export const useEntityContext = () => useContext(EntityContext);

export const EntityProvider = ({ children }: EntityContextProviderProps) => {
    const [entities, setEntities] = useState([] as Entity[]);

    useEffect(() => {
        if (localStorage.getItem("login") == "true") setupEntity();
    }, []);

    function setupEntity() {
        console.log("Entity Loaded");
        setEntities(getEntities());
    }

    return <EntityContext.Provider value={{ setupEntity, entities, setEntities }}>{children}</EntityContext.Provider>;
};
