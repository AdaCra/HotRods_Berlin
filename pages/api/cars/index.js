import dbConnect from "@/db/connect";
import Car from "@/db/models/Cars";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const cars = await Car.find();
      return response.status(200).json(cars);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "POST") {
    try {
      const carData = request.body;
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
