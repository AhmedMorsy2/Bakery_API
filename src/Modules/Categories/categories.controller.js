import { Categories } from "../../../Database/Models/category.model.js";
import { Products } from "../../../Database/Models/product.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addCategory = catchError(async (req, res, next) => {
  const category = await Categories.insertMany(req.body);
  res.status(200).json({ message: "success", category });
});

const allCategories = catchError(async (req, res, next) => {
  const categories = await Categories.find();
  if (categories.length === 0)
    return next(new AppError("There is no categories", 404));
  res.status(200).json({ message: "success", categories });
});

const updateCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Category id is required", 404));
  const category = await Categories.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!category) return next(new AppError("Category not found", 404));
  res.status(200).json({ message: "success", category });
});

const deleteCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Category id is required", 404));
  const category = await Categories.findByIdAndDelete(id);
  if (!category) return next(new AppError("Category not found", 404));
  res.status(200).json({ message: "success", category });
});

const getCategoryProducts = catchError(async (req, res, next) => {
  const { id } = req.params;
  const products = await Products.find({ category: id });
  if (products.length === 0)
    return next(new AppError("There is no products", 404));
  res.status(200).json(products);
});

export {
  addCategory,
  deleteCategory,
  updateCategory,
  allCategories,
  getCategoryProducts,
};
