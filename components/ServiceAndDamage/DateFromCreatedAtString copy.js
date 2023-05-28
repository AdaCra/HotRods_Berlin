export default function DateFromCreatedAtString(createdAt) {
  console.log(createdAt);
  const createAtTimestamp = new Date(createdAt);
  const formattedDate = createAtTimestamp.toLocaleDateString("en-GB");
  return formattedDate;
}
