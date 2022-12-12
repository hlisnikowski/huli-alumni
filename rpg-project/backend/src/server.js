import { app } from "./index.js";
import chalk from "chalk";
import db from "./config/db.js";
import { initData } from "./config/init.js";

// Will generate json file so it can read all necessary information.

(async () => {
    try {
        await db.authenticate();
    } catch (error) {
        console.error(chalk.red("Unable to connect to the database:", error));
    }
    // await db.sync({ force: false }).then(async () => {
    //     if (dump_proto) await generateItemProto();
    //     // await initData();
    // });
})();

app.listen(8080, () => {
    console.log("Server started on port : 8080");
});
