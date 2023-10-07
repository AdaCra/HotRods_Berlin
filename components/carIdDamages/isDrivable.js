export function isDrivable(car) {
  const undrivable = car.damageReports.filter(
    (report) => !report.isResolved && !report.isDrivable
  );

  const drivingAffected = car.damageReports.filter(
    (report) =>
      !report.isResolved && report.isDrivable && report.isAffectsDriving
  );
  // console.table(drivingAffected);
  if (drivingAffected.length > 0) return false;
  else if (undrivable.length > 0) return null;
  else return true;
}
