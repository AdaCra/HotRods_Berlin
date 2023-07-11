import { useEffect, useState } from "react";
import styled from "styled-components";

const DropHeading = styled.h4`
  display: flex;
  justify-content: space-between;
`;

export default function ExpandingH4WithOnClickToggle({
  title,
  onClickFunction,
  currentState,
}) {
  const [rotate, setRotate] = useState(false);

  function handleRotate() {
    setRotate((prevRotate) => !prevRotate);
  }
  useEffect(() => {
    setRotate(currentState);
  }, [currentState]);
  
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
