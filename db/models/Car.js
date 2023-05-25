import mongoose from "mongoose";
import "./DamageReport";
import "./Service"

const { Schema } = mongoose;

const carSchema = new Schema({
  licensePlateNumber: { type: String, required: true },
  damageReports: [{ type: Schema.Types.ObjectId, ref: "DamageReport" }],
  serviceHistory: [{ type: Schema.Types.ObjectId, ref: "Service" }],
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
