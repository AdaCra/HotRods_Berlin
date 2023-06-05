export default function TimeDifference(createAtTimestamp) {
  const currentTimeStamp = new Date();
  const timeDifference =
    currentTimeStamp.getTime() - createAtTimestamp.getTime();
  const hoursSinceLastUpdate = timeDifference / (1000 * 60 * 60);
  return hoursSinceLastUpdate;
}
