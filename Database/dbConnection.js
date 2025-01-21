import mongoose from "mongoose";

export const db = mongoose
  .connect("mongodb://localhost:27017/Bakery")
  .then(() => {
    console.log("DataBase Connection Successfully");
  })
  .catch((error) => {
    console.log(error);
  });
