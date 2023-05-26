import dbConnect from "@/db/connect";
import Car from "@/db/models/Car";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      try {
        const cars = await Car.find()
        .populate('damageReports')
        .populate('serviceHistory');
        return response.status(200).json(cars);
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }
    case "POST":
      try {
        const carData = request.body;
        carData.damageReport = []
        carData.serviceHistory = []
        const car = new Car(carData);
        await car.save();
        return response
          .status(200)
          .json({ status: `Car ${car.platenumber} added to fleet` });
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }
  }
}
