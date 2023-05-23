import Image from "next/image";
import styled from "styled-components";
import UnorderedAnchorList from "./Lists/UnorderedAnchorList";

const HotrodTitle = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  margin: 0;
  padding: 20px;
  text-align: center;
  z-index: 1;
`;

export default function Header() {
  const listItemsArray = [
    { title: "Fahrzeugverfügbarkeit", link: "/cars" },
    { title: "Wetterprognose", link: "/weather" },
    { title: "Create Damage Report", link: "/damageReport/create" },
    { title: "Benzine Count", link: "/benzine" },
    { title: "Unfall", link: "/accident/create" },
  ];

  return (
    <header>
      <h1>
        <Image
          src="/Hot-Rod-Tour-Berlin-Logo-Main.png"
          alt="Hotrod Tour Berlin Logo"
          width={138}
          height={100}
        />
      </h1>

      <UnorderedAnchorList
        cssId={"header__menuItems"}
        cssClass={"menuLinks"}
        listItemsArray={listItemsArray}
      />
    </header>
  );
}
