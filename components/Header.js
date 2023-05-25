import Image from "next/image";
import styled from "styled-components";
import UnorderedAnchorList from "./Lists/UnorderedHeaderList";
import Link from "next/link";

const HotrodHeader = styled.header`
  position: relative;
  display: flex;
  margin: 0 auto;
  height: 100px;
  border-bottom: 1px solid var(--fontColor-body);
  z-index: 1;
`;

const HotrodLogo = styled.a`
  position: fixed;
  left: calc(7.5% - 69px);
`;
// calc(7.5%-69px)
export default function Header() {
  const listItemsArray = [
    { title: "Fahrzeuge", link: "/cars" },
    { title: "Wetter", link: "/weather" },
    { title: "Schadensbericht", link: "/damageReport/create" },
    { title: "Benzine", link: "/benzine" },
    { title: "Unfall", link: "/accident/create" },
  ];

  return (
    <HotrodHeader>
      <UnorderedAnchorList
        cssId={"header__menuItems"}
        cssClass={"menuLinks"}
        listItemsArray={listItemsArray}
      />
    </HotrodHeader>
  );
}
