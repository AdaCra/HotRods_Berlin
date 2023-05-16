import dbConnect from "@/db/connect";
import DamageReport from "@/db/models/DamageReport";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const damageReport = await DamageReport.find();
      return response.status(200).json(damageReport);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "POST") {
    try {
      const damageReportData = request.body;
      const damageReport = new DamageReport(damageReportData);
      await damageReport.save();
      return response.status(200).json({ status: "Damage report saved" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "DELETE") {
    try {
      const placeToDelete = await Place.findByIdAndDelete(id);
      response.status(200).json(placeToDelete);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Bad Request", error: error.message });
    }
  }
}
