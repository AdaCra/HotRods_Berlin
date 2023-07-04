export function isDrivable(car) {
  const unresolvedUndrivable = car.damageReports.filter(
    (report) => !report.isResolved && !report.isDrivable
  );

  const unresolvedNonCosmetic = car.damageReports.filter(
    (report) =>
      !report.isResolved && report.isAffectsDriving && report.isDrivable
  );
  if (unresolvedNonCosmetic.length > 0) return null;
  else if (unresolvedUndrivable.length === 0) return true;
  else return false;
}
