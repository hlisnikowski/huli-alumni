import Equipment from "./Equipment.js";
import Inventory from "./Inventory.js";
import Item from "./Item.js";
import Shop from "./Shop.js";
import User from "./User.js";

// User model (the model that the function is being invoked on) is the source.
// Project model (the model being passed as an argument) is the target.
Item.hasMany(Inventory, {
    sourceKey: "vnum", // Item Reference column
    foreignKey: "vnum", // Inventory FK column
});

User.hasMany(Inventory); // Map by id

Item.hasMany(Equipment, {
    sourceKey: "vnum",
    foreignKey: "vnum",
});

User.hasMany(Equipment);

Item.hasMany(Shop, {
    sourceKey: "vnum",
    foreignKey: "vnum",
});

export { Item, User, Inventory, Equipment, Shop };
