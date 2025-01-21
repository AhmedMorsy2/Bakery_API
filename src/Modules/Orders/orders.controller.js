import { Orders } from "../../../Database/Models/orders.model.js";
import { Products } from "../../../Database/Models/product.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addOrder = catchError(async (req, res, next) => {
  const { products, ...orderData } = req.body;

  const consolidatedProducts = [];
  let totalCost = 0;
  for (const item of products) {
    const product = await Products.findById(item.product);
    if (!product) {
      return next(new AppError(`Product with ID  not found`, 404));
    }

    if (item.quantity > product.stock) {
      return next(new AppError(`Out of stock`, 400));
    }
    const existingProduct = consolidatedProducts.find(
      (product) => product.product === item.product
    );

    if (existingProduct) {
      existingProduct.quantity += item.quantity || 1;
      totalCost += product.price * item.quantity;
    } else {
      consolidatedProducts.push({ ...item, quantity: item.quantity || 1 });
      totalCost += product.price * item.quantity;
    }
  }
  const order = await Orders.create({
    ...orderData,
    products: consolidatedProducts,
    total: totalCost,
  });

  res.status(200).json({ message: "success", order });
});

const getAllOrders = catchError(async (req, res, next) => {
  const orders = await Orders.find().populate({
    path: "products.product", // Populate the productId within products
    model: "Products", // Reference the Products model
  });
  if (orders.length === 0) return next(new AppError("There is no orders", 404));
  res.status(200).json({ message: "success", orders });
});

const updateOrder = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Order Id is required", 404));
  const order = await Orders.findByIdAndUpdate(id, req.body, { new: true });
  order || next(new AppError("Order not found", 404));
  !order || res.status(200).json({ message: "success", order });
});

const deleteOrder = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Order Id is required", 404));
  const order = await Orders.findByIdAndDelete(id);
  order || next(new AppError("Order not found", 404));
  !order || res.status(200).json({ message: "success", order });
});

export { addOrder, getAllOrders, updateOrder, deleteOrder };
