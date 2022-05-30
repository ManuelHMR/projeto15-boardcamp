import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import categoriesRouter from "./routers/categoriesRouter.js";
import customersRouter from "./routers/customersRouter.js"
import gamesRouter from "./routers/gamesRouter.js";
import rentalsRouter from "./routers/rentalsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(customersRouter);
app.use(gamesRouter);
app.use(rentalsRouter);

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});