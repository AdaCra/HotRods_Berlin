import mongoose from "mongoose";

const { Schema } = mongoose;

const partsSchema = new Schema({
  partName: { type: String, required: true },
  partNumber: { type: String, required: true },
  partRetailer: {
    name: { type: String },
    email: { type: String },
    accountNumber: { type: String },
  },
  alertQuantity: {
    type: Number,
    required: true,
    min: 0,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Die Anzahl muss eine ganze Zahl sein",
    },
  },
  category: {
    type: String,
    enum: [
      "Fahrwerkskomponenten",
      "Antriebsstrang",
      "Radmontage",
      "Elektrobauteile",
      "Verschieden",
    ],
    required: true,
  },
  subcategory: {
    type: String,
    enum: {
      values: {
        Fahrwerkskomponenten: ["Karosserie", "Rahmen", "Verschieden"],
        Antriebsstrang: ["Motor", "Kraftstoffsystem", "Getriebe", "Kühlung"],
        Radmontage: ["Bremssystem", "Radnabeneinheit", "Reifen", "Lenkung"],
        Elektrobauteile: [
          "Verkabelung",
          "Batterien",
          "Schalter",
          "Beleuchtung",
        ],
        Verschieden: [
          "Sicherheitsausrüstung",
          "Cockpitausstattung",
          "Reinigung",
          "Werkzeuge",
        ],
      },
      message: "Ungültiger Unterkategoriewert",
    },
    required: true,
  },
  currentQuantity: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "Die Anzahl muss eine ganze Zahl sein.",
    },
    default: 0,
  },
  usageHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service", // Reference to the Service model
    },
    {
      type: Schema.Types.ObjectId,
      ref: "DamageReport", // Reference to the DamageReport model
    },
  ],
  purchaseHistory: [
    {
      receiptNumber: { type: String },
      receiptQty: {
        type: Number,
        required: true,
        min: 1,
        validate: {
          validator: Number.isInteger,
          message: "Die Anzahl muss eine ganze Zahl sein.",
        },
      },
    },
  ],

  createdAt: { type: Date, default: Date.now }, // Add createdAt field
});

partsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

const Parts = mongoose.models.Parts || mongoose.model("Parts", partsSchema);

export default Parts;
