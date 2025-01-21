import { Router } from "express";
import {
  addCategory,
  allCategories,
  deleteCategory,
  getCategoryProducts,
  updateCategory,
} from "./categories.controller.js";
import {
  allowedTo,
  protectedRoutes,
} from "../../Middlewares/protectedRoutes.js";

const categoryRouter = Router();
categoryRouter.get("/", allCategories);
categoryRouter.get("/:id", getCategoryProducts);
categoryRouter.use(protectedRoutes, allowedTo("Manager", "Cashier"));
categoryRouter.route("/").post(addCategory);
categoryRouter.route("/:id").put(updateCategory).delete(deleteCategory);

export default categoryRouter;
