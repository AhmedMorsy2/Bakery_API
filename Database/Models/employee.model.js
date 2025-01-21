import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const schema = new Schema(
  {
    name: String,
    email: {
      type: String,
    },
    password: String,
    role: {
      type: String,
      enum: ["Manager", "Cashier", "Baker"],
    },
    salary: Number,
    hireDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const Employee = model("Employee", schema);
