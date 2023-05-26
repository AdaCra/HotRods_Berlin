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
        const serviceData = request.body;

        const car = await Car.findOne({ _id: serviceData.carId });
        if (!car) {
          return response.status(404).json({ status: "Car not found" });
        }

        const newService = new Service(serviceData);
        const savedService = await newService.save();

        car.serviceHistory.push(savedService._id);
        await car.save();

        return response.status(200).json({ status: "Service has been logged" });
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }
  }
}
