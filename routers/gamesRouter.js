import express from "express";

import { getGames, postGames } from "../controllers/gamesControllers.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", postGames)

export default gamesRouter;