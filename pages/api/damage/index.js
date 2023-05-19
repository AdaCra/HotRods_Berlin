import dbConnect from "@/db/connect";
import DamageReport from "@/db/models/DamageReport";
import Car from "@/db/models/Car";

export default async function handler(request, response) {
  await dbConnect();
  console.log("connected");

  switch (request.method) {
    case "GET":
      try {
        const damageReport = await DamageReport.find();
        return response.status(200).json(damageReport);
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }
    case "POST":
      try {
        const damageReportData = request.body;

        const car = await Car.findOne({
          licensePlateNumber: damageReportData.licensePlateNumber,
        });

        if (!car) {
          return response.status(404).json({ status: "Car not found" });
        }
        damageReportData.carId = car._id;


        console.log("This is the req.body:", damageReportData);

        const newdamageReport = new DamageReport(damageReportData);


        await newdamageReport.save();

        //
        // console.log("Updated car:", car);
        //

        return response.status(200).json({ status: "Damage report saved" });
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }
  }
}
