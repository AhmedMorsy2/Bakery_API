import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Categories = model("Categories", schema);
