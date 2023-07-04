import { useEffect, useState } from "react";
import styled from "styled-components";
import Checkbox from "@/components/GeneralComponents/Checkbox/Checkbox";
import ExpandingH4WithOnClickToggle from "@/components/GeneralComponents/ExpandingH/ExpandingH4WithOnClickToggle";

export const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

export default function MechanikSelectors({
  setGroup,
  handleShowMechanikServiceDetails,
  showMechanikService,
}) {
  const [mechanik_Gaskabel, setMechanik_Gaskabel] = useState(false);
  const [mechanik_Bremskabel, setMechanik_Bremskabel] = useState(false);
  const [mechanik_Bremsflüssigkeit, setMechanik_Bremsflüssigkeit] =
    useState(false);
  const [mechanik_Bremsbelagsatz, setMechanik_Bremsbelagsatz] = useState(false);
  const [mechanik_Radlager, setMechanik_Radlager] = useState(false);
  const [mechanik_Reifen, setMechanik_Reifen] = useState(false);

  useEffect(() => {
    setGroup({
      Gaskabel: mechanik_Gaskabel,
      Bremskabel: mechanik_Bremskabel,
      Bremsflüssigkeit: mechanik_Bremsflüssigkeit,
      Bremsbelagsatz: mechanik_Bremsbelagsatz,
      Radlager: mechanik_Radlager,
      Reifen: mechanik_Reifen,
    });
  }, [
    mechanik_Gaskabel,
    mechanik_Bremskabel,
    mechanik_Bremsflüssigkeit,
    mechanik_Bremsbelagsatz,
    mechanik_Radlager,
    mechanik_Reifen,
    setGroup,
  ]);

  function handleCheckboxChange(set, is) {
    set((prevIs) => {
      const newIs = !prevIs;
      return newIs;
    });
  }

  return (
    <section id="mechanikSection">
      <ExpandingH4WithOnClickToggle
        title={"Mechanik"}
        onClickFunction={handleShowMechanikServiceDetails}
        currentState={showMechanikService}
      />
      {showMechanikService && (
        <section style={{ padding: "0 100px" }}>
          <InputDiv>
            <Checkbox
              key={"me1"}
              label={"Gaskabel"}
              name={"Gaskabel"}
              value={mechanik_Gaskabel}
              onChange={() =>
                handleCheckboxChange(setMechanik_Gaskabel, mechanik_Gaskabel)
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"me2"}
              label={"Bremskabel"}
              name={"Bremskabel"}
              value={mechanik_Bremskabel}
              onChange={() =>
                handleCheckboxChange(
                  setMechanik_Bremskabel,
                  mechanik_Bremskabel
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"me3"}
              label={"Bremsflüssigkeit"}
              name={"Bremsflüssigkeit"}
              value={mechanik_Bremsflüssigkeit}
              onChange={() =>
                handleCheckboxChange(
                  setMechanik_Bremsflüssigkeit,
                  mechanik_Bremsflüssigkeit
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"me4"}
              label={"Bremsbelagsatz"}
              name={"Bremsbelagsatz"}
              value={mechanik_Bremsbelagsatz}
              onChange={() =>
                handleCheckboxChange(
                  setMechanik_Bremsbelagsatz,
                  mechanik_Bremsbelagsatz
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"me5"}
              label={"Radlager"}
              name={"Radlager"}
              value={mechanik_Radlager}
              onChange={() =>
                handleCheckboxChange(setMechanik_Radlager, mechanik_Radlager)
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"me6"}
              label={"Reifen"}
              name={"Reifen"}
              value={mechanik_Reifen}
              onChange={() =>
                handleCheckboxChange(setMechanik_Reifen, mechanik_Reifen)
              }
              disabled={false}
            />
          </InputDiv>
        </section>
      )}
    </section>
  );
}
