import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    stock: {
      type: Number,
      default: 1,
    },
    category: {
      type: Types.ObjectId,
      ref: "Categories",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Products = model("Products", schema);
