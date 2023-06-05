import mongoose from "mongoose";
import "./Car";

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    mechanicName: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    odometerReading: { type: Number, required: true },
    serviceIncluded: {
      engine: {
        öl: { type: Boolean, required: true, default: false }, //oil
        Kühlmittel: { type: Boolean, required: true, default: false },//coolant
        Ölfilter: { type: Boolean, required: true, default: false },//oil Filter
        Luftfilter: { type: Boolean, required: true, default: false },//air Filter
        Kraftstofffilter: { type: Boolean, required: true, default: false },//fuel Filter
        Keilriemen: { type: Boolean, required: true, default: false },//fan Belt
        Zahnriemen: { type: Boolean, required: true, default: false },//timing Belt
      },
      electrics: {
        Zündkerzen: { type: Boolean, required: true, default: false },//spark Plugs
        Zündkerzenkabel: { type: Boolean, required: true, default: false },//spark Plug Cables
        Sicherungen: { type: Boolean, required: true, default: false },//fuses
        Lampen: { type: Boolean, required: true, default: false },//lamps
        Batterie: { type: Boolean, required: true, default: false },//battery
      },
      mechanical: {
        Gaskabel: { type: Boolean, required: true, default: false },//gas Cable
        Bremskabel: { type: Boolean, required: true, default: false },//break Cable
        Bremsflüssigkeit: { type: Boolean, required: true, default: false },//brake Fluid
        Bremsbelagsatz: { type: Boolean, required: true, default: false },//brake Pads
        Radlager: { type: Boolean, required: true, default: false },//wheel Bearings
        Reifen: { type: Boolean, required: true, default: false },//tires
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;


// mechanicName
//     odometerReading
//     serviceIncluded
//       engine
//         oil
//         coolant
//         oil Filter
//         air Filter
//         fuel Filter
//         timing Belt
//       },

//       electrics: {
//         spark Plugs
//         spark Plug Cables
//         fuses
//         lamps
//         battery
//       },
//       mechanical: {
//         gas Cable
//         break Cable
//         brake Fluid
//         brake Pads
//         wheel Bearings
//         tires
//       },