import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";

export const emailExist = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findOne({ email: req.body.email });
    if (document) return next(new AppError("Email already exist", 404));
    next();
  });
};
