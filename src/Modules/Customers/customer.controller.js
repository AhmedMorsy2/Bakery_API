import { Customers } from "../../../Database/Models/customers.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addCustomer = catchError(async (req, res, next) => {
  const customer = await Customers.insertMany(req.body);
  res.status(200).json({ message: "success", customer });
});

const getAllCustomers = catchError(async (req, res, next) => {
  const customers = await Customers.find();
  if (customers.length === 0)
    return next(new AppError("There is no customers", 404));
  res.status(200).json({ message: "success", customers });
});

const updateCustomer = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Customer id is required", 404));
  const customer = await Customers.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  customer || next(new AppError("Customer not found", 404));
  !customer || res.status(200).json({ message: "success", customer });
});

const deleteCustomer = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Customer id is required", 404));
  const customer = await Customers.findByIdAndDelete(id);
  customer || next(new AppError("Customer not found", 404));
  !customer || res.status(200).json({ message: "success", customer });
});

export { addCustomer, getAllCustomers, updateCustomer, deleteCustomer };
