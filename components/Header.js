import styled from "styled-components";
import UnorderedAnchorList from "./Lists/UnorderedHeaderList";

const HotrodHeader = styled.header`
  position: relative;
  display: flex;
  margin: 0 auto;
  height: 100px;
  border-bottom: 1px solid var(--fontColor-body);
  z-index: 1;
`;

export default function Header() {
  const listItemsArray = [
    { title: "Autos", link: "/cars" },
    { title: "Wetter", link: "/weather" },
    { title: "Schaden", link: "/damageReport" },
    { title: "Benzine", link: "/benzine" },
    { title: "Unfall", link: "/accident" },
  ];

  return (
    <HotrodHeader>
      <UnorderedAnchorList
        cssId={"header__menuItems"}
        listItemsArray={listItemsArray}
      />
    </HotrodHeader>
  );
}
