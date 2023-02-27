import entity_data from "../data/entities.json";

const e_path = "src/assets/game/entities/";
const m_path = "src/assets/game/maps/";

export type Entity = {
    vnum: number;
    name: string;
    level: number;
    hp: number;
    atk: number;
    def: number;
    crit: number;
    map: number;
    loot: number;
    energy: number;
};

export const getEntity = (vnum: number): Entity => {
    const e = entity_data.find((e) => e.vnum === vnum);
    return e ? e : getDefaultEntity();
};

export const getEntities = () => {
    return entity_data as Entity[];
};

export const getEntityIcon = (vnum: number) => {
    return e_path + vnum + ".gif";
};

export const getMapIcon = (vnum: number) => {
    return m_path + vnum + ".png";
};

export const getDefaultEntity = () => {
    let e = {
        vnum: 0,
        name: "None",
        level: 0,
        hp: 0,
        atk: 0,
        def: 0,
        crit: 0,
        map: 0,
        loot: 0,
        energy: 0,
    } as Entity;
    return e;
};
