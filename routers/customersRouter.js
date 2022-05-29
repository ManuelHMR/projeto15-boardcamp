import express from "express";

import { getCustomers, getCustomersById, postCustomers, putCustomers } from "../controllers/customersControllers.js"

const customersRouter = express.Router();

customersRouter.get('/Customers', getCustomers);
customersRouter.get('/Customers/:id', getCustomersById);
customersRouter.post('/Customers', postCustomers);
customersRouter.put('/Customers/:id', putCustomers);

export default customersRouter;