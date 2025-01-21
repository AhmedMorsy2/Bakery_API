import { Employee } from "../../../Database/Models/employee.model.js";
import { catchError } from "../../utils/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError.js";
const signup = catchError(async (req, res, next) => {
  req.body.role = "Manager";
  const employee = new Employee(req.body);
  employee.save();
  const token = jwt.sign(
    {
      empId: employee._id,
      role: employee.role,
      name: employee.name,
    },
    process.env.JWT_KEY
  );
  res.status(200).json({ message: "success", token });
});

const signin = catchError(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email });
  if (employee && bcrypt.compareSync(req.body.password, employee.password)) {
    const token = jwt.sign(
      {
        empId: employee._id,
        role: employee.role,
        name: employee.name,
      },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("Incorrect Email or Password", 401));
});

const changePassword = catchError(async (req, res, next) => {
  let employee = await Employee.findById(req.employee._id);
  if (employee && bcrypt.compareSync(req.body.oldPassword, employee.password)) {
    await Employee.findByIdAndUpdate(req.employee._id, {
      password: req.body.newPassword,
    });
    let token = jwt.sign(
      {
        empId: employee._id,
        role: employee.role,
        name: employee.name,
        email: employee.email,
      },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("Incorrect old password", 401));
});

export { signin, signup, changePassword };
