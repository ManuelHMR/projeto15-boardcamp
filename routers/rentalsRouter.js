import express from "express";

import { getRentals, postRentals, returnRentals, deleteRentals } from "../controllers/rentalsControllers.js";
import { checkCustomer, checkGame, checkDays, checkStock, checkRental } from "../middlewares/rentalsMiddlewares.js";

const rentalsRouter = express.Router();

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", checkCustomer, checkGame, checkDays, checkStock, checkRental, postRentals)
rentalsRouter.post("/rentals/:id/return", checkRental, returnRentals)
rentalsRouter.delete("/rentals/:id", checkRental, deleteRentals)

export default rentalsRouter;