import dbConnect from "@/db/connect";
import Car from "@/db/models/Car";
import Service from "@/db/models/Service";

export default async function handler(request, response) {
  await dbConnect();
  
    switch (request.method) {
      case "GET":
        try {
          const services = await Service.find();
          return response.status(200).json(services);
        } catch (error) {
          return response.status(400).json({ error: error.message });
        }
      case "POST":
        try {
          const service = request.body;
  
          const car = await Car.findOne({
            //get ID from the api path
          });
  
          if (!car) {
            return response.status(404).json({ status: "Car not found" });
          }
          const carID = car._id;
          damageReportData.carId = carID;
  
          const newdamageReport = new DamageReport(damageReportData);
          const savedDamageReport = await newdamageReport.save();
  
          console.log(car);
          car.damageReports.push(savedDamageReport._id);
          await car.save();
  
          return response.status(200).json({ status: "Damage report saved" });
        } catch (error) {
          return response.status(400).json({ error: error.message });
        }
    }
  }
