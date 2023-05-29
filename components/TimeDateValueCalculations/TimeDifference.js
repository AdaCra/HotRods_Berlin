export default function TimeDifference({
  createAtTimestamp,
  hoursSinceLastUpdate,
}) {
  const currentTimeStamp = new Date();
  const timeDifference =
    currentTimeStamp.getTime() - createAtTimestamp.getTime();
  hoursSinceLastUpdate = timeDifference / (1000 * 60 * 60);
}
