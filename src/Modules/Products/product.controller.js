import { Products } from "../../../Database/Models/product.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addProduct = catchError(async (req, res, next) => {
  const product = await Products.insertMany(req.body);
  res.status(200).json({ message: "success", product });
});

const allProducts = catchError(async (req, res, next) => {
  const products = await Products.find().populate("category");
  if (products.length === 0)
    return next(new AppError("There is no products", 404));
  res.status(200).json({ message: "success", products });
});

const updateProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Product id is required", 404));
  const product = await Products.findByIdAndUpdate(id, req.body, { new: true });
  product || next(new AppError("There is no product with this ID", 404));
  !product || res.status(200).json({ message: "success", product });
});

const deleteProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Product id is required", 404));
  const product = await Products.findByIdAndDelete(id);
  product || next(new AppError("There is no product with this ID", 404));
  !product || res.status(200).json({ message: "success", product });
});

export { deleteProduct, updateProduct, allProducts, addProduct };
