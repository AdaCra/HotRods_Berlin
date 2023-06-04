import mongoose from "mongoose";

import "./Car";

const { Schema } = mongoose;

const damageReportSchema = new Schema(
  {
    reporterName: { type: String },
    licensePlateNumber: { type: String },
    carId: { type: Schema.Types.ObjectId, ref: "Car" },
    isDrivable: { type: Boolean, default: true },
    type: {
      type: String,
      enum: ["body", "mechanical", "electrical"],
    },
    description: { type: String, max: 170 },
    photo: { type: String },
    isResolved: { type: Boolean, default: false },
    resolvedDate: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const DamageReport =
  mongoose.models.DamageReport ||
  mongoose.model("DamageReport", damageReportSchema);

export default DamageReport;
