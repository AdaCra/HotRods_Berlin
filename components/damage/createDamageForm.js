import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import Checkbox from "../GeneralComponents/Checkbox/Checkbox";
import H2TextPopUp from "../GeneralComponents/Loading/Loading";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
const FormInput = styled.input`
  width: 250px;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
  text-align: center;
`;

const FormSelector = styled.select`
  width: 250px;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
  text-align: center;
`;

const FullTextArea = styled.textarea`
  padding: 5px 15px;
  width: 100%;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
`;
export default function CreateDamageForm({ handleSubmit }) {
  const router = useRouter();
  const { isReady } = router;
  const {
    data: cars,
    isLoading: carLoading,
    error: carError,
  } = useSWR("/api/cars", { fallbackData: [] });

  if (!isReady || carLoading || carError)
    return (
      <H2TextPopUp text = "LOADING..."/>

    );

  const redirectToHomePage = () => {
    router.push("/damageReport");
  };

  function onChange(event){
    console.log(event)
  }
  return (
    <CenterSection>
      <h2>SCHADENSBERICHT ERSTELLEN</h2>
      <section>
        <form>
          <fieldset>
            <legend>
              <h3>Detail des Schadens</h3>
            </legend>

            {/* 1 */}
            <InputDiv>
              <label htmlFor="reporterName">Ihren Name: </label>
              <FormInput
                type="text"
                id="reporterName"
                name="reporterName"
                max={30}
              />
              {/* 2 */}
            </InputDiv>
            <InputDiv>
              <label htmlFor="licensePlateNumber">Autonummernschild: </label>
              <FormSelector id="licensePlateNumber" name="licensePlateNumber">
                {cars.map((car) => {
                  return (
                    <option key={car._id} value={car.licensePlateNumber}>
                      {car.licensePlateNumber}
                    </option>
                  );
                })}
              </FormSelector>
            </InputDiv>
            <InputDiv>
              {/* 3 */}
              <label htmlFor="isDrivable">Ist das Auto noch fahrbar</label>
              <Checkbox
                name="isDrivable"
                defaultChecked={true}
                onChange={onChange}
              />
            </InputDiv>
            <InputDiv>
              {/* 4 */}
              <label htmlFor="type">Art des Schadens:</label>
              <FormSelector id="type" name="type">
                <option value={"body"}>Karosserie</option>
                <option value={"electrical"}>Elektrisch</option>
                <option value={"mechanical"}>Mechanisch</option>
              </FormSelector>
            </InputDiv>
            <InputDiv style={{ flexDirection: "column" }}>
              {/* 5 */}
              <label htmlFor="description">Beschreibung des Schadens</label>
              <FullTextArea
                name="description"
                id="description"
                maxLength={130}
              />
            </InputDiv>
          </fieldset>
        </form>
      </section>
    </CenterSection>
  );
}
