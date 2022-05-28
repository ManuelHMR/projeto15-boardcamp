import express from "express";

import {getCategories, postCategories} from "./../controllers/categoriesControllers.js";
import {categoriesValidation} from "./../middlewares/categoriesMiddleware.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories", categoriesValidation, postCategories)

export default categoriesRouter;