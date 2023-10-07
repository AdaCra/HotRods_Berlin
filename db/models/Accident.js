import mongoose from "mongoose";
import "./DamageReport"; // Import the DamageReport schema.

import "./Car"; // Import the Car schema.

const { Schema } = mongoose;

// Define the contact schema separately for reusability
const contactSchema = {
  name: { type: String },
  street: { type: String },
  number: { type: Number },
  postcode: { type: Number },
  city: { type: String },
  country: { type: String },
  contactNumber: { type: Number },
  email: { type: String },
};

const accidentSchema = new Schema({
  guideName: { type: String, required: true },
  driver: contactSchema,
  dateOfAccident: { type: Date, required: true },
  timeOfAccident: { type: Date, required: true },
  location: { type: String, required: true },
  optionalInsuranceCover: { type: Boolean, required: true },
  outsiderInvolved: { type: Boolean, required: true },
  outsiderDetails: {
    ...contactSchema,
    insurance: { type: String, required: true },
    modeOfTransport: {
      type: String,
      enum: ["Pedestrian", "Cyclist/E-scooter", "Driver"],
    },
    outsiderCar: {
      licensePlateNumber: { type: String },
      Make: { type: String },
      Model: { type: String },
      color: { type: String },
      outsiderCarDamageDescription: {
        type: String,
        minlength: 20,
        maxlength: 1000,
      },
      photos: { type: String },
    },
  },
  eventDescription: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 1000,
  },
  numberOfCarsInvolved: { type: Number },
  carsInvolved: [{ type: Schema.Types.ObjectId, ref: "Accident" }],
  createdAt: { type: Date, default: Date.now }, // Add createdAt field
  updatedAtAt: { type: Date, default: Date.now }, // Add updatedAt field
});

accidentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

// Define the Accident model if it doesn't already exist
const Accident =
  mongoose.models.Accident || mongoose.model("Accident", accidentSchema);

export default Accident;
