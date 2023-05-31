import { useState } from "react";
import styled from "styled-components";

const DropHeading = styled.h3`
  display: flex;
  justify-content: space-between;
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
      <span>{rotate ? "▲" : "▽"}</span>
      <span>{title}</span>
      <span>{rotate ? "▲" : "▽"}</span>
    </DropHeading>
  );
}
