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

export default function ElektrikSelectors({
  setGroup,
  handleShowElektrikServiceDetails,
  showElektrikService,
}) {
  const [elektrik_Zündkerzen, setElektrik_Zündkerzen] = useState(false);
  const [elektrik_Zündkerzenkabel, setElektrik_Zündkerzenkabel] =
    useState(false);
  const [elektrik_Sicherungen, setElektrik_Sicherungen] = useState(false);
  const [elektrik_Lampen, setElektrik_Lampen] = useState(false);
  const [elektrik_Batterie, setElektrik_Batterie] = useState(false);

  useEffect(() => {
    setGroup({
      Zündkerzen: elektrik_Zündkerzen,
      Zündkerzenkabel: elektrik_Zündkerzenkabel,
      Sicherungen: elektrik_Sicherungen,
      Lampen: elektrik_Lampen,
      Batterie: elektrik_Batterie,
    });
  }, [
    elektrik_Zündkerzen,
    elektrik_Zündkerzenkabel,
    elektrik_Sicherungen,
    elektrik_Lampen,
    elektrik_Batterie,
    setGroup,
  ]);

  function handleCheckboxChange(set, is) {
    set((prevIs) => {
      const newIs = !prevIs;
      return newIs;
    });
  }

  return (
    <section id="elektrikSection">
      <ExpandingH4WithOnClickToggle
        title={"Elektrik"}
        onClickFunction={handleShowElektrikServiceDetails}
        currentState={showElektrikService}
      />
      {showElektrikService && (
        <section style={{ padding: "0 100px" }}>
          <InputDiv>
            <Checkbox
              key={"e1"}
              label={"Zündkerzen"}
              name={"Zündkerzen"}
              value={elektrik_Zündkerzen}
              onChange={() =>
                handleCheckboxChange(
                  setElektrik_Zündkerzen,
                  elektrik_Zündkerzen
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"e2"}
              label={"Zündkerzenkabel"}
              name={"Zündkerzenkabel"}
              value={elektrik_Zündkerzenkabel}
              onChange={() =>
                handleCheckboxChange(
                  setElektrik_Zündkerzenkabel,
                  elektrik_Zündkerzenkabel
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"e3"}
              label={"Sicherungen"}
              name={"Sicherungen"}
              value={elektrik_Sicherungen}
              onChange={() =>
                handleCheckboxChange(
                  setElektrik_Sicherungen,
                  elektrik_Sicherungen
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"e4"}
              label={"Lampen"}
              name={"Lampen"}
              value={elektrik_Lampen}
              onChange={() =>
                handleCheckboxChange(setElektrik_Lampen, elektrik_Lampen)
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"e5"}
              label={"Batterie"}
              name={"Batterie"}
              value={elektrik_Batterie}
              onChange={() =>
                handleCheckboxChange(setElektrik_Batterie, elektrik_Batterie)
              }
              disabled={false}
            />
          </InputDiv>
        </section>
      )}
    </section>
  );
}
