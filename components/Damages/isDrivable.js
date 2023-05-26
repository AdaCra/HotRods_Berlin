export function isDrivable(car) {
  const unresolvedUndrivable = car.damageReports.filter(
    (report) => !report.isResolved && !report.isDrivable
  );

  if (unresolvedUndrivable.length === 0) {
    return true;
  } else {
    return false;
  }
}
