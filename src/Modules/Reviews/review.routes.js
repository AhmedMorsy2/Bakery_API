import { Router } from "express";
import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "./review.controller.js";

const reviewRouter = Router();

reviewRouter.route("/:productId").post(addReview).get(getProductReviews);
reviewRouter
  .route("/:productId/review/:reviewId")
  .put(updateReview)
  .delete(deleteReview);

export default reviewRouter;
