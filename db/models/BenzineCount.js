import mongoose from "mongoose";

const { Schema } = mongoose;

const benzineCountSchema = new Schema({
  name: { type: String, required: true },
  count: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "The count must be a whole number.",
    },
  },
  isRefill: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // Add createdAt field
});

// Create an index with a TTL of 10 seconds on the createdAt field
benzineCountSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

const BenzineCount =
  mongoose.models.BenzineCount ||
  mongoose.model("BenzineCount", benzineCountSchema);

export default BenzineCount;
