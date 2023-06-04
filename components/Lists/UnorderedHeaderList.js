import Image from "next/image";
import Link from "next/link";
import { LinkList, ListItem, ListLogo } from "./UnorderedHeaderList.style";
import ScreenWidthCheck from "../GeneralComponents/ScreenWidthCheck/ScreenWidthCheck";

export default function UnorderedHeaderList({
  cssId,
  cssClass,
  listItemsArray,
}) {
  const displayWidth = ScreenWidthCheck();
  const image = { width: 138, height: 96 };
  switch (true) {
    case displayWidth >= 1200:
      image.width = 138;
      image.height = 96;
      break;
    case displayWidth < 1080 && displayWidth >= 650:
      image.width = 138 * 0.9;
      image.height = 96 * 0.9;
      break;
    case displayWidth < 650 && displayWidth >= 550:
      image.width = 138 * 0.8;
      image.height = 96 * 0.8;
      break;
    case displayWidth < 550:
      image.width = 138 * 0.7;
      image.height = 96 * 0.7;
      break;
  }

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {displayWidth < 490 && (
        <>
          <Link href={"/"}>
            <h1>
              <Image
                src="/Hot-Rod-Tour-Berlin-Logo-Main.png"
                alt="Hotrod Tour Berlin Logo"
                width={image.width}
                height={image.height}
                priority={true}
              />
            </h1>
          </Link>
        </>
      )}
      <LinkList id={cssId} className={cssClass}>
        {displayWidth >= 490 && (
          <ListLogo>
            <Link href={"/"}>
              <h1>
                <Image
                  src="/Hot-Rod-Tour-Berlin-Logo-Main.png"
                  alt="Hotrod Tour Berlin Logo"
                  width={image.width}
                  height={image.height}
                  priority
                />
              </h1>
            </Link>
          </ListLogo>
        )}

        {listItemsArray.map((listItem, i) => (
          <ListItem key={listItem._id ? listItem._id : i}>
            <Link href={listItem.link}>{listItem.title.toUpperCase()}</Link>
          </ListItem>
        ))}
      </LinkList>
    </div>
  );
}
