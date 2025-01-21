import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    email: String,
    phone: Number,
    address: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Customers = model("Customers", schema);
