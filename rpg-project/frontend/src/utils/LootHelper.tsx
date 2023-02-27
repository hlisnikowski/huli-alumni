import loots from "../data/loots.json";
import { getItem, Item, ItemData } from "./ItemHelper";

export type LootData = {
    name: string;
    id: number;
    money: number;
    loot: {
        vnum: number;
        chance: number;
    }[];
};

export const getLoot = (id: number): Item[] => {
    let entity = loots.find((i) => i.id == id);
    if (entity)
        return entity.loot.map((i) => {
            return getItem({ vnum: i.vnum, hash: "123" } as ItemData);
        });
    return [];
};

export const getLootPrice = (entityID: number): number => {
    let entity = loots.find((i) => i.id == entityID);
    return entity ? entity.money : 0;
};

export const getLootData = (entityID: number): LootData => {
    let entity = loots.find((i) => i.id == entityID);
    return entity ? entity : ({} as LootData);
};
