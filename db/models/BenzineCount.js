import mongoose from "mongoose";

const { Schema } = mongoose;

const benzineCountSchema = new Schema(
  {
    count: {
      type: Number,
      required: true,
      minimum: 0,
      validate: {
        validator: Number.isInteger,
        message: "The count must be a whole number.",
      },
    },
  },
  { timestamps: true }
);

const BenzineCount =
  mongoose.models.BenzineCount ||
  mongoose.model("BenzineCount", benzineCountSchema);

export default BenzineCount;
