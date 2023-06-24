export function isDrivable(car) {
  const unresolvedUndrivable = car.damageReports.filter(
    (report) => !report.isResolved && !report.isDrivable
  );

  const unresolvedNonCosmetic = car.damageReports.filter(
    (report) => !report.isResolved && !report.type === "Kosmetik"
  );
  if (unresolvedUndrivable.length === 0) {
    return true;
  } else {
    return false;
  }
}
