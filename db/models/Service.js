import mongoose from "mongoose";
import "./Car"; // Importing related model "Car"

const { Schema } = mongoose;

const serviceSchema = new Schema({
  mechanicName: { type: String, required: true },
  date: { type: Date, required: true },
  licensePlateNumber: { type: String },
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  odometerReading: { type: Number, required: true },
  serviceIncluded: {
    Motor: {
      Öl: { type: Boolean, required: true, default: false }, // Öl means oil
      Kühlmittel: { type: Boolean, required: true, default: false }, // Kühlmittel means coolant
      Ölfilter: { type: Boolean, required: true, default: false }, // Ölfilter means oil Filter
      Luftfilter: { type: Boolean, required: true, default: false }, // Luftfilter means air Filter
      Kraftstofffilter: { type: Boolean, required: true, default: false }, // Kraftstofffilter means fuel Filter
      Keilriemen: { type: Boolean, required: true, default: false }, // Keilriemen means fan Belt
      Zahnriemen: { type: Boolean, required: true, default: false }, // Zahnriemen means timing Belt
    },
    Elektrik: {
      Zündkerzen: { type: Boolean, required: true, default: false }, // Zündkerzen means spark Plugs
      Zündkerzenkabel: { type: Boolean, required: true, default: false }, // Zündkerzenkabel means spark Plug Cables
      Sicherungen: { type: Boolean, required: true, default: false }, // Sicherungen means fuses
      Lampen: { type: Boolean, required: true, default: false }, // Lampen means lamps
      Batterie: { type: Boolean, required: true, default: false }, // Batterie means battery
    },
    Mechanik: {
      Gaskabel: { type: Boolean, required: true, default: false }, // Gaskabel means gas Cable
      Bremskabel: { type: Boolean, required: true, default: false }, // Bremskabel means break Cable
      Bremsflüssigkeit: { type: Boolean, required: true, default: false }, // Bremsflüssigkeit means brake Fluid
      Bremsbelagsatz: { type: Boolean, required: true, default: false }, // Bremsbelagsatz means brake Pads
      Radlager: { type: Boolean, required: true, default: false }, // Radlager means wheel Bearings
      Reifen: { type: Boolean, required: true, default: false }, // Reifen means tires
    },
  },
  createdAt: { type: Date, default: Date.now }, // Add createdAt field
  updatedAt: { type: Date, default: Date.now }, // Add updatedAt field
});

serviceSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

// Define the Service model if it doesn't already exist
const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
