import mongoose from "mongoose";
import "./Cars";

const { Schema } = mongoose;

const damageReportSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["body", "mechanical", "electrical"],
    required: true,
  },
  // accident: { type: Schema.Types.ObjectId, ref: 'Accident' },
  description: { type: String },
  photo: { type: String },
  orderList: [
    {
      partsListID: { type: Number },
    },
  ],
  resolved: { type: Boolean, default: false },
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
  isDrivable: { type: Boolean },
});

const DamageReport =
  mongoose.models.DamageReport ||
  mongoose.model("DamageReport", damageReportSchema);

export default DamageReport;
