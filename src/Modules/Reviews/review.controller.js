import { Review } from "../../../Database/Models/review.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addReview = catchError(async (req, res, next) => {
  req.body.product = req.params.productId;
  const review = await Review.insertMany(req.body);
  res.status(200).json({ message: "success", review });
});

const getProductReviews = catchError(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) return next(new AppError("Product id is required", 404));
  const reviews = await Review.find({ product: productId }).populate(
    "customer"
  );
  if (reviews.length === 0)
    return next(new AppError("There is no reviews", 404));
  res.status(200).json({ message: "success", reviews });
});

const updateReview = catchError(async (req, res, next) => {
  const { productId, reviewId } = req.params;

  if (!productId || !reviewId)
    return next(new AppError("Product id and review id are required", 404));
  const review = await Review.findOneAndUpdate(
    {
      product: productId,
      _id: reviewId,
    },
    req.body,
    { new: true }
  );
  review || next(new AppError("Review not found", 404));
  !review || res.status(200).json({ message: "success", review });
});

const deleteReview = catchError(async (req, res, next) => {
  const { productId, reviewId } = req.params;
  if (!productId || !reviewId)
    return next(new AppError("Product id and review id are required", 404));
  const review = await Review.findOneAndDelete({
    product: productId,
    _id: reviewId,
  });
  review || next(new AppError("Review not found", 404));
  !review || res.status(200).json({ message: "success", review });
});

export { deleteReview, updateReview, addReview, getProductReviews };
