import { Employee } from "../../Database/Models/employee.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";
import jwt from "jsonwebtoken";

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let employeeData = null;
  if (!token) return next(new AppError("Token not provided", 401));
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) return next(new AppError(err, 401));
      employeeData = data;
    });

    let employee = await Employee.findById(employeeData.empId);
    if (!employee) return next(new AppError("Employee not found", 404));
    req.employee = employee;
    next();
  }
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.employee.role)) return next();
    return next(
      new AppError("You are not authorized to access this end point", 401)
    );
  });
};

export { protectedRoutes, allowedTo };
