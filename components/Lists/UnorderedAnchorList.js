import Link from "next/link";

export default function UnorderedAnchorList({
  cssId,
  cssClass,
  listItemsArray,
}) {
  return (
    <ul id={cssId} className={cssClass}>
      {listItemsArray.map((listItem, i) => (
        <li key={listItem._id ? listItem._id : i}>
          <Link href={listItem.link}>{listItem.title}</Link>
        </li>
      ))}
      ,
    </ul>
  );
}
