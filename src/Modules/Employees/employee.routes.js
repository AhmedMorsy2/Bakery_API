import { Router } from "express";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "./employee.controller.js";
import { Employee } from "../../../Database/Models/employee.model.js";
import { emailExist } from "../../Middlewares/checkExist.js";
import {
  allowedTo,
  protectedRoutes,
} from "../../Middlewares/protectedRoutes.js";

const employeeRouter = Router();
employeeRouter.use(protectedRoutes, allowedTo("Manager"));
employeeRouter
  .route("/")
  .post(protectedRoutes, emailExist(Employee), addEmployee)
  .get(getAllEmployees);
employeeRouter.route("/:id").put(updateEmployee).delete(deleteEmployee);

export default employeeRouter;
