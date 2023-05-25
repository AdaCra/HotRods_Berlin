import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const LinkList = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  text-decoration: none;
  list-style: none;
  font-size: 1.5em;
  width: 70%;
  margin: auto;
  text-align: center;
  z-index: 1;
  @media (max-width: 1200px) {
    font-size: 1.4em; 
  }
  @media (max-width: 950px) {
    font-size: 1.1em; 
  }
  @media (max-width: 800px) {
    font-size: 1.0em; 
  }
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
`;

const ListItem = styled.li`
  margin: 0;
  padding: 10px 20px;
  border: 1px solid var(--fontColor-body);
  border-style: none solid;
  width: 100%;
  &:hover {
    color: var(--fontColor-highlight);
    background-color: var(--background-highlight);
    border: 2px solid var(--fontColor-highlight);
    border-style: none solid;
  }
  &:click {
    color: var(--fontColor-highlight);
    background-color: var(--background-highlight);
    border: 2px solid var(--fontColor-highlight);
    border-style: none solid;
  }
  @media (max-width: 1200px) {
    padding: 10px 15px;
  }
  @media (max-width: 950px) {
    padding: 10px 10px;
  }
  @media (max-width: 800px) {
    padding: 10px 5px;
  }
  @media (max-width: 650px) {
    display: none;
  }
`;
const ListLogo = styled.li`
margin: 0;
flex-shrink: 0;
`;

export default function UnorderedHeaderList({
  cssId,
  cssClass,
  listItemsArray,
}) {
  return (
    <LinkList id={cssId} className={cssClass}>
      <ListLogo>
        <Link href={"/"}>
          <h1>
            <Image
              src="/Hot-Rod-Tour-Berlin-Logo-Main.png"
              alt="Hotrod Tour Berlin Logo"
              width={138}
              height={100}
              style={{ margin: "0 auto" }}
            />
          </h1>
        </Link>
      </ListLogo>

      {listItemsArray.map((listItem, i) => (
        <ListItem key={listItem._id ? listItem._id : i}>
          <Link href={listItem.link}>
            <h2>{listItem.title.toUpperCase()}</h2>
          </Link>
        </ListItem>
      ))}
    </LinkList>
  );
}
