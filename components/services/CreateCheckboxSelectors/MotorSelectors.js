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

export default function MotorSelectors({
  setGroup,
  handleShowMotorServiceDetails,
  showMotorService,
}) {
  const [motor_ÖlCheck, setMotor_ÖlCheck] = useState(false);
  const [motor_KühlmittelCheck, setMotor_KühlmittelCheck] = useState(false);
  const [motor_ÖlfilterCheck, setMotor_ÖlfilterCheck] = useState(false);
  const [motor_LuftfilterCheck, setMotor_LuftfilterCheck] = useState(false);
  const [motor_KraftstofffilterCheck, setMotor_KraftstofffilterCheck] =
    useState(false);
  const [motor_KeilriemenCheck, setMotor_KeilriemenCheck] = useState(false);
  const [motor_ZahnriemenahnCheck, setMotor_ZahnriemenCheck] = useState(false);

  useEffect(() => {
    setGroup({
      Öl: motor_ÖlCheck,
      Kühlmittel: motor_KühlmittelCheck,
      Ölfilter: motor_ÖlfilterCheck,
      Luftfilter: motor_LuftfilterCheck,
      Kraftstofffilter: motor_KraftstofffilterCheck,
      Keilriemen: motor_KeilriemenCheck,
      Zahnriemen: motor_ZahnriemenahnCheck,
    });
  }, [
    motor_ÖlCheck,
    motor_KühlmittelCheck,
    motor_ÖlfilterCheck,
    motor_LuftfilterCheck,
    motor_KraftstofffilterCheck,
    motor_KeilriemenCheck,
    motor_ZahnriemenahnCheck,
    setGroup,
  ]);

  function handleCheckboxChange(set, is) {
    set((prevIs) => {
      const newIs = !prevIs;
      return newIs;
    });
  }

  return (
    <section id="motorSection">
      <ExpandingH4WithOnClickToggle
        title={"Motor"}
        onClickFunction={handleShowMotorServiceDetails}
        currentState={showMotorService}
      />
      {showMotorService && (
        <section style={{ padding: "0 100px" }}>
          <InputDiv>
            <Checkbox
              key={"m1"}
              label={"Öl"}
              name={"Öl"}
              value={motor_ÖlCheck}
              onChange={() =>
                handleCheckboxChange(setMotor_ÖlCheck, motor_ÖlCheck)
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"m2"}
              label={"Kühlmittel"}
              name={"Kühlmittel"}
              value={motor_KühlmittelCheck}
              onChange={() =>
                handleCheckboxChange(
                  setMotor_KühlmittelCheck,
                  motor_KühlmittelCheck
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"m3"}
              label={"Ölfilter"}
              name={"Ölfilter"}
              value={motor_ÖlfilterCheck}
              onChange={() =>
                handleCheckboxChange(
                  setMotor_ÖlfilterCheck,
                  motor_ÖlfilterCheck
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"m4"}
              label={"Luftfilter"}
              name={"Luftfilter"}
              value={motor_LuftfilterCheck}
              onChange={() =>
                handleCheckboxChange(
                  setMotor_LuftfilterCheck,
                  motor_LuftfilterCheck
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"m5"}
              label={"Kraftstofffilter"}
              name={"Kraftstofffilter"}
              value={motor_KraftstofffilterCheck}
              onChange={() =>
                handleCheckboxChange(
                  setMotor_KraftstofffilterCheck,
                  motor_KraftstofffilterCheck
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"m6"}
              label={"Keilriemen"}
              name={"Keilriemen"}
              value={motor_KeilriemenCheck}
              onChange={() =>
                handleCheckboxChange(
                  setMotor_KeilriemenCheck,
                  motor_KeilriemenCheck
                )
              }
              disabled={false}
            />
          </InputDiv>
          <InputDiv>
            <Checkbox
              key={"m7"}
              label={"Zahnriemen"}
              name={"Zahnriemen"}
              value={motor_ZahnriemenahnCheck}
              onChange={() =>
                handleCheckboxChange(
                  setMotor_ZahnriemenCheck,
                  motor_ZahnriemenahnCheck
                )
              }
              disabled={false}
            />
          </InputDiv>
        </section>
      )}
    </section>
  );
}
