import express from "express";

import {getCategories, postCategories} from "./../controllers/categoriesControllers.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories", postCategories)

export default categoriesRouter;