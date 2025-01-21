import { Router } from "express";
import { signin, signup } from "./auth.controller.js";
import { emailExist } from "../../Middlewares/checkExist.js";
import { Employee } from "../../../Database/Models/employee.model.js";

const authRouter = Router();

authRouter.post("/signup", emailExist(Employee), signup);
authRouter.post("/signin", signin);

export default authRouter;
