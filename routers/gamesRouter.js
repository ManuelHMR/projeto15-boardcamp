import express from "express";

import { getGames, postGames } from "../controllers/gamesControllers.js";
import { gamesValidation } from "../middlewares/gamesMiddleware.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", gamesValidation, postGames)

export default gamesRouter;