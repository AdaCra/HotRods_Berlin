import dbConnect from "@/db/connect";
import BenzineCount from "@/db/models/BenzineCount";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const benzine = await BenzineCount.find();
      return response.status(200).json(benzine);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const benzineCount = request.body;
      const benzine = new BenzineCount(benzineCount);
      await benzine.save();
      return response.status(200).json({ status: "Benzine count saved" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
