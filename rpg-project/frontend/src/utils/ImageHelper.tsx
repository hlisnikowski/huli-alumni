const path = "src/assets/game/items";
const icons = [
    path + "/Potion/Red_Potion.png",
    path + "/Potion/Blue_Potion.png",
    path + "/Potion/Green_Potion.png",
    path + "/Equipment/Iron_Helmet.png",
    path + "/Materials/Golden_Ingot.png",
    path + "/Equipment/Bag.png",
];

const getIcon = (id: number): string => {
    return icons[id];
};

export { getIcon };
