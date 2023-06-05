import mongoose from "mongoose";
import "./DamageReport";
import "./Car";

const { Schema } = mongoose;

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
      outsiderCarDamageDescription: { type: String, min: 20, max: 1000 },
      photos: { type: URL },
    },
  },
  eventDescription: { type: String, required: true, min: 20, max: 1000 },
  numberOfCarsInvolved: { type: Number },
  carsInvolved: [{ type: Schema.Types.ObjectId, ref: "Accident" }],
});

const Accident = mongoose.models.Accident || mongoose.model("Accident", accidentSchema);

export default Accident;
