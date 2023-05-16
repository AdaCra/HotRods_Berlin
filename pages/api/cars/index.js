import dbConnect from "@/db/connect";
import Car from "@/db/models/Cars";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const cars = await Cars.find();
      return res.status(200).json(cars);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  if (req.method === "POST") {
    try {
      const carData = request.body;
      const car = new Car(carData);
      await car.save();
      return res.status(200).json({ status: "Car added to fleet" });
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}
