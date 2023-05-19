import dbConnect from "@/db/connect";
import Car from "@/db/models/Car";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  switch (request.method) {
    case "GET":
      try {
        const car = await Car.findById(id);

        if (!car) {
          console.log(id);
          return response
            .status(404)
            .json({ status: `${id} could not be found` });
        }

        return response.status(200).json(car);
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }

    case "DELETE":
      try {
        const carToDelete = await Car.findByIdAndDelete(id);
        response.status(200).json({
          message: `Car registration ${carToDelete.platenumber} was deleted`,
        });
      } catch (error) {
        return response
          .status(400)
          .json({ message: "Bad Request", error: error.message });
      }

    case "PATCH":
      try {
        const carToUpdate = await Car.findByIdAndUpdate(id, {
          $set: request.body,
        });
        response.status(200).json(carToUpdate);
      } catch (error) {
        return response
          .status(400)
          .json({ message: "Bad Request", error: error.message });
      }
  }
}
