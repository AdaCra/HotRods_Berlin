import mongoose from "mongoose";

const { Schema } = mongoose;

const benzineCountSchema = new Schema(
  {
    name: { type: String, required: true },
    count: {
      type: Number,
      required: true,
      minimum: 0,
      validate: {
        validator: Number.isInteger,
        message: "The count must be a whole number.",
      },
    },
    isRefill: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const BenzineCount =
  mongoose.models.BenzineCount ||
  mongoose.model("BenzineCount", benzineCountSchema);

export default BenzineCount;
