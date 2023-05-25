export default function filterAndSplitDamageReportsByCarId(
  damageReports,
  carId
) {
  const filteredReports = damageReports.filter(
    (report) => report.carId === carId
  );

  const resolvedReports = filteredReports.filter((report) => report.isResolved);
  const unresolvedReports = filteredReports.filter(
    (report) => !report.isResolved
  );

  return {
    resolvedReports, unresolvedReports
  }
}
