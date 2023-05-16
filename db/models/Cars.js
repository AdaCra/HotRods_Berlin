import mongoose from "mongoose";
import "./DamageReport";

const { Schema } = mongoose;

const carSchema = new Schema({
  platenumber: { type: String, required: true },
  serviceHistory: [
    {
      date: { type: Date, default: Date.now },
      odometerReading: { type: Number },
      // validate: {
      //   validator: function (value) {
      //     if (!this.serviceHistory) {
      //       // No previous readings available, validation passes
      //       return true;
      //     }
      //     const previousReading =
      //       this.serviceHistory[this.serviceHistory.length - 1].odometerReading;
      //     return value > previousReading;
      //   },
      //   message: "Odometer reading must be larger than the last reading.",
      // },
      // },
    },
  ],
  currentDamageReports: [{ type: Schema.Types.ObjectId, ref: "DamageReport" }],
  resolvedDamageReports: [{ type: Schema.Types.ObjectId, ref: "DamageReport" }],
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
