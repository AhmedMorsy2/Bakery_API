import { Router } from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  updateProduct,
} from "./product.controller.js";
import { protectedRoutes } from "../../Middlewares/protectedRoutes.js";

const productRouter = Router();

productRouter.get("/", allProducts);
productRouter.use(protectedRoutes);
productRouter.route("/").post(addProduct);
productRouter.route("/:id").put(updateProduct).delete(deleteProduct);

export default productRouter;
