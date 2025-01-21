import authRouter from "./src/Modules/Auth/auth.routes.js";
import categoryRouter from "./src/Modules/Categories/categories.routes.js";
import customerRouter from "./src/Modules/Customers/customer.routes.js";
import employeeRouter from "./src/Modules/Employees/employee.routes.js";
import orderRouter from "./src/Modules/Orders/orders.routes.js";
import productRouter from "./src/Modules/Products/product.routes.js";
import reviewRouter from "./src/Modules/Reviews/review.routes.js";

export const bootsrap = (app) => {
  app.use("/api/employees", employeeRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/products", productRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/customers", customerRouter);
  app.use("/api/orders", orderRouter);
};
