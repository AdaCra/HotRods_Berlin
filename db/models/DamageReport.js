import mongoose from "mongoose";
import "./Car";

const { Schema } = mongoose;

const damageReportSchema = new Schema(
  {
    reporterName: { type: String, required: true },
    licensePlateNumber: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    type: {
      type: String,
      enum: ["body", "mechanical", "electrical"],
      required: true,
    },
    // accident: { type: Schema.Types.ObjectId, ref: 'Accident' },
    description: { type: String, required: true, min: 15, max: 500 },
    photo: { type: String },
    orderList: [
      {
        partsListID: { type: Number },
      },
    ],
    isResolved: { type: Boolean, default: false },
    resolvedDate: { type: Date },
    mechanicNotes: { type: String },
    repairCosts: [
      {
        labourHours: { type: Number },
        estimateCostPerHour: { type: Number },
        materialsUsed: [
          {
            consumable: { type: String },
            amount: { type: Number },
            costPerAmount: { type: Number },
          },
        ],
        partsUsed: [{ part: { type: Number }, quantity: { type: Number } }],
      },
    ],
    isDrivable: { type: Boolean, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const DamageReport =
  mongoose.models.DamageReport ||
  mongoose.model("DamageReport", damageReportSchema);

export default DamageReport;
