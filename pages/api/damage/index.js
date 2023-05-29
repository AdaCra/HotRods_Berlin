import dbConnect from "@/db/connect";
import DamageReport from "@/db/models/DamageReport";
import Car from "@/db/models/Car";

export default async function handler(request, response) {
  await dbConnect();

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
        const carID = car._id;
        damageReportData.carId = carID;

        const newdamageReport = new DamageReport(damageReportData);
        const savedDamageReport = await newdamageReport.save();

        car.damageReports.push(savedDamageReport._id);
        await car.save();

        return response.status(200).json({ status: "Damage report saved" });
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }
  }
}
