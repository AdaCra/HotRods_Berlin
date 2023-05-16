import mongoose from "mongoose";

const { Schema } = mongoose;

const benzineSchema = new Schema({
  count: {
    type: Number,
    required: true,
    minimum: 0,
    validate: {
      validator: Number.isInteger,
      message: "The count must be a whole number.",
    },
  },
  lastUpdate: { type: String, required: true },
});

const Benzine =
  mongoose.models.Benzine || mongoose.model("Benzine", benzineSchema);

export default Benzine;
