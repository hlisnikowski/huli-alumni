import Equipment from "./Equipment.js";
import Inventory from "./Inventory.js";
import Item from "./Item.js";
import Shop from "./Shop.js";
import Skill from "./Skill.js";
import Spell from "./Spell.js";
import Spellbook from "./Spellbook.js";
import User from "./User.js";

// User model (the model that the function is being invoked on) is the source.
// Project model (the model being passed as an argument) is the target.
Item.hasMany(Inventory, {
    sourceKey: "vnum", // Item Reference column
    foreignKey: "vnum", // Inventory FK column
});

Item.hasMany(Inventory, {
    sourceKey: "subtype",
    foreignKey: "subtype",
});

User.hasMany(Inventory); // Map by id

Item.hasMany(Equipment, {
    sourceKey: "vnum",
    foreignKey: "vnum",
});

Item.hasMany(Equipment, {
    sourceKey: "subtype",
    foreignKey: "subtype",
});

User.hasMany(Equipment);

Item.hasMany(Shop, {
    sourceKey: "vnum",
    foreignKey: "vnum",
});

Spell.hasMany(Spellbook, {
    sourceKey: "vnum",
    foreignKey: "vnum",
});

User.hasMany(Spellbook);

Skill.belongsTo(User);
User.hasOne(Skill);

// Skill is only table for storing level of its spells .
// Spellbook act like inventory but only for spells.
// Spell is like item
// [Item -> Inventory / Equipment] [Spell -> Spellbook]
// [User -> Skill]
export { Item, User, Inventory, Equipment, Shop, Spell, Spellbook, Skill };
