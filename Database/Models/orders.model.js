import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    customer: {
      type: Types.ObjectId,
      ref: "Customers",
    },
    products: [
      {
        product: { type: Types.ObjectId, ref: "Products" },
        quantity: {
          type: Number,
        },
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Orders = model("Orders", schema);
