export default function isDrivable(car) {
 
  const resolvedReports = filteredReports.filter((report) => report.isResolved);
  const unresolvedReports = filteredReports.filter(
    (report) => !report.isResolved
  );

  return {
    resolvedReports,
    unresolvedReports,
  };
}
