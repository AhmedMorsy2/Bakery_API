import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "Products",
    },
    customer: {
      type: Types.ObjectId,
      ref: "Customers",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Review = model("Review", schema);
