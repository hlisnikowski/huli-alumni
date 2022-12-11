import { flagService } from "./bitflag.js";

(() => {
    let res = 0;
    res += 1 << 3;
    let e = flagService;
    e.add(14);
    console.log(e.has(8));
})();
