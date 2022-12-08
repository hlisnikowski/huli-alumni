import express from "express";
import cors from "cors";
import routers from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { tokenAuthentication } from "./middlewares/tokenAuthentication.js";

const app = express();

// SETUP
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MAP
app.use("/api", routers.publicRouter);
app.use(tokenAuthentication);
app.use("/api/user", routers.userRouter);

// UTIL
app.use(errorHandler);

export { app };
