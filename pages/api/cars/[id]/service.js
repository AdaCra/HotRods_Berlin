import dbConnect from "@/db/connect";
import Car from "@/db/models/Car";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  const service = request.body;
  console.log(service);
  if (request.method === "PATCH") {
    try {
      const carToService = await Car.findById(id);
      carToService.serviceHistory.push(service);
      await carToService.save();
      response.status(200).json(carToService);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Bad Request", error: error.message });
    }
  }
}
