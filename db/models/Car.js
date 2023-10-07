import mongoose from "mongoose";
import "./DamageReport";
import "./Service";

const { Schema } = mongoose;

const carSchema = new Schema({
  licensePlateNumber: { type: String, required: true },
  damageReports: [{ type: Schema.Types.ObjectId, ref: "DamageReport" }],
  serviceHistory: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  createdAt: { type: Date, default: Date.now }, // Add createdAt field
});

// Create a TTL index for the createdAt field with a 30-minute expiration
carSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

// Define the Car model if it doesn't already exist
const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
