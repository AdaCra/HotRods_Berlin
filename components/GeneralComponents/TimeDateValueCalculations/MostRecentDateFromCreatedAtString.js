export default function MostRecentDateFromCreatedAtString(data) {
  if (data.length > 0) {
    const createAtTimestamp = new Date(data[data.length - 1].createdAt);
    const formattedDate = createAtTimestamp.toLocaleDateString("en-GB");
    return formattedDate;
  }
  return "Es wurden keine Dienste geladen";
}
