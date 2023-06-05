export default function LastElementValue(data, key) {
  if (data.length > 0) {
    const value = data[data.length - 1][key];
    return value;
  }
  return "null";
}
