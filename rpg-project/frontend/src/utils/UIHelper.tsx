export const EXP = [0, 10, 25, 75, 180, 390, 880, 2050, 5005, 1105, 2350, 4980, 10250];

export type Stats = {
    hp: number;
    max_hp: number;
    mana: number;
    max_mana: number;
    exp: number;
    level: number;
    atk: number;
    def: number;
    crit: number;
};

export const getBarValue = (current: number, max: number): string => {
    let fill = current / max;
    let val = 208 * fill;
    return val + "px";
};
