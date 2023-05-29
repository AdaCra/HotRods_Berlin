import { useState } from "react";
import styled from "styled-components";

const DropHeading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const ArrowDrop = styled.h3`
  width: 20%;
  text-align: center;
`;
const TitleDrop = styled.h3`
  width: 60%;
  text-align: center;
`;
export default function ExpandingH3WithOnClickToggle({
  title,
  onClickFunction,
}) {
  const [rotate, setRotate] = useState(false);

  function handleRotate() {
    setRotate((prevRotate) => !prevRotate);
  }
  return (
    <DropHeading
      style={{ cursor: "pointer" }}
      onClick={() => {
        onClickFunction(), handleRotate();
      }}
    >
      <ArrowDrop>
        <span>{rotate ? "▲" : "▽"}</span>
      </ArrowDrop>
      <TitleDrop>{title}</TitleDrop>
      <ArrowDrop>
        <span>{rotate ? "▲" : "▽"}</span>
      </ArrowDrop>
    </DropHeading>
  );
}
