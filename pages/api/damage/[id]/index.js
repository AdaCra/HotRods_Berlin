import dbConnect from "@/db/connect";
import DamageReport from "@/db/models/DamageReport";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  switch (request.method) {
    case "GET":
    try {
      const damageReport = await DamageReport.findById(id);

      if (!damageReport) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(damageReport);
    } catch (error) {
      return response.status(405).json({ status: "Method not allowed" });
    }
  case "POST":
    try {
      const damageReportData = request.body;
      
      const damageReport = new DamageReport(damageReportData);
      await damageReport.save();
      return response.status(200).json({ status: "Damage report saved" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  case "PATCH":
    try {
      const damageReportToUpdate = await DamageReport.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json(damageReportToUpdate);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Bad Request", error: error.message });
    }
  }
}
