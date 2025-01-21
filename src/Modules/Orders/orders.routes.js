import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "./orders.controller.js";
import { protectedRoutes } from "../../Middlewares/protectedRoutes.js";

const orderRouter = Router();

orderRouter.use(protectedRoutes);
orderRouter.route("/").get(getAllOrders).post(addOrder);
orderRouter.route("/:id").put(updateOrder).delete(deleteOrder);

export default orderRouter;
