import mongoose from "mongoose";
import "./Car";

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    mechanicName: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    odometerReading: { type: Number, required: true },
    serviceIncluded: {
      engine: {
        oil: { type: Boolean, required: true, default: false },
        coolant: { type: Boolean, required: true, default: false },
        oilFilter: { type: Boolean, required: true, default: false },
        airFilter: { type: Boolean, required: true, default: false },
        fuelFilter: { type: Boolean, required: true, default: false },
        fanBelt: { type: Boolean, required: true, default: false },
        timingBelt: { type: Boolean, required: true, default: false },
      },
      electrics: {
        sparkPlugs: { type: Boolean, required: true, default: false },
        sparkPlugCables: { type: Boolean, required: true, default: false },
        fuses: { type: Boolean, required: true, default: false },
        lamps: { type: Boolean, required: true, default: false },
        battery: { type: Boolean, required: true, default: false },
      },
      mechanical: {
        gasCable: { type: Boolean, required: true, default: false },
        breakCable: { type: Boolean, required: true, default: false },
        brakeFluid: { type: Boolean, required: true, default: false },
        brakePads: { type: Boolean, required: true, default: false },
        wheelBearings: { type: Boolean, required: true, default: false },
        tires: { type: Boolean, required: true, default: false },
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
