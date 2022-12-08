import { app } from "./index.js";
import chalk from "chalk";
import db from "./config/db.js";
import { initData } from "./config/init.js";

(async () => {
    try {
        await db.authenticate();
    } catch (error) {
        console.error(chalk.red("Unable to connect to the database:", error));
    }
    await db.sync({ force: true }).then(async () => {
        await initData();
    });
})();

app.listen(8080, () => {
    console.log("Server started on port : 8080");
});
