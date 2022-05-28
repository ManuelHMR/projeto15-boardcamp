import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import categoriesRouter from "./routers/categoriesRouter.js";
import clientsRouter from "./routers/clientsRouter.js"
import gamesRouter from "./routers/gamesRouter.js";
import rentRouter from "./routers/rentRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(clientsRouter);
app.use(gamesRouter);
app.use(rentRouter);

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});