import express from "express";

import { getCustomers, getCustomersById, postCustomers, putCustomers } from "../controllers/customersControllers.js"
import { customersValidation, uniqueCpfValidation } from "../middlewares/customersMiddlewares.js";

const customersRouter = express.Router();

customersRouter.get('/Customers', getCustomers);
customersRouter.get('/Customers/:id', getCustomersById);
customersRouter.post('/Customers', customersValidation, uniqueCpfValidation, postCustomers);
customersRouter.put('/Customers/:id', customersValidation, putCustomers);

export default customersRouter;