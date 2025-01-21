import { Employee } from "../../../Database/Models/employee.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addEmployee = catchError(async (req, res, next) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(200).json({ message: "success", employee });
});

const getAllEmployees = catchError(async (req, res, next) => {
  const employees = await Employee.find();
  if (employees.length === 0)
    return next(new AppError("There is no employees", 404));
  res.status(200).json({ message: "success", employees });
});

const updateEmployee = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Employee id is required", 404));
  const employee = await Employee.findOneAndUpdate(
    { id, $or: [{ role: "Cashier" }, { role: "Baker" }] },
    req.body,
    {
      new: true,
    }
  );
  employee || next(new AppError("Employee not found", 404));
  !employee || res.status(200).json({ message: "success", employee });
});

const deleteEmployee = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Employee id is required", 404));
  const employee = await Employee.findOneAndDelete({
    id,
    $or: [{ role: "Cashier" }, { role: "Baker" }],
  });
  employee || next(new AppError("Employee not found", 404));
  !employee || res.status(200).json({ message: "success", employee });
});

export { addEmployee, deleteEmployee, updateEmployee, getAllEmployees };
