import { Router } from "express";
import {
  addCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from "./customer.controller.js";
import { emailExist } from "../../Middlewares/checkExist.js";
import { Customers } from "../../../Database/Models/customers.model.js";
import {
  allowedTo,
  protectedRoutes,
} from "../../Middlewares/protectedRoutes.js";

const customerRouter = Router();
customerRouter.use(protectedRoutes, allowedTo("Manager", "Cashier"));
customerRouter
  .route("/")
  .post(emailExist(Customers), addCustomer)
  .get(getAllCustomers);
customerRouter.route("/:id").put(updateCustomer).delete(deleteCustomer);

export default customerRouter;
