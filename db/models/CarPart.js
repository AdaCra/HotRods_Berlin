import mongoose from "mongoose";

const { Schema } = mongoose;

const partsSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  image: {
    type: URL,
  },
  cost: {
    type: Number,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

const Parts = mongoose.models.Parts || mongoose.model("Parts", partsSchema);

export default Parts;
