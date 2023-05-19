import mongoose from "mongoose";
import "./DamageReport";

const { Schema } = mongoose;

const carSchema = new Schema({
  licensePlateNumber: { type: String, required: true },
  serviceHistory: {
    type: [
      {
        date: { type: Date, default: Date.now },
        odometerReading: { type: Number },
      },
    ],
    default: [],
  },

});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
