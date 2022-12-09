const path = "src/assets/game/items";

const icons = [
    path + "/Potion/potion_5.png",
    path + "/Potion/potion_1.png",
    path + "/Equipment/wooden/armor_1.png",
    path + "/Equipment/wooden/shoe_1.png",
    path + "/Equipment/wooden/glove_1.png",
    path + "/Equipment/wooden/helmet_1.png",
    path + "/Equipment/wooden/shield_1.png",
    path + "/Equipment/wooden/sword_140.png",
    path + "/Equipment/wooden/leg_1.png",
    path + "/Equipment/rings/ring_20.png",
    path + "/Materials/cloth_3.png",
    path + "/Equipment/cloak_2.png",
];

const getIcon = (id: number): string => {
    return icons[id];
};

export { getIcon };
