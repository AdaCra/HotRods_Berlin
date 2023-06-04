import { useRouter } from "next/router";
import useSWR from "swr";
import Checkbox from "../GeneralComponents/Checkbox/Checkbox";
import H2TextPopUp from "../GeneralComponents/Loading/Loading";
import {
  CenterSection,
  InputDiv,
  FormInput,
  FormSelector,
  FullTextArea,
  FormButton,
  FormStyled,
} from "./createDamageForm.style";
import DamageImageUpload from "./damageImageUpload";
import { useState } from "react";

export default function CreateDamageForm({ onSubmit }) {
  const [isChecked, setIsChecked] = useState(true);
  const router = useRouter();
  const { isReady } = router;
  const {
    data: cars,
    isLoading: carLoading,
    error: carError,
  } = useSWR("/api/cars", { fallbackData: [] });

  if (!isReady || carLoading || carError)
    return <H2TextPopUp text="LOADING..." />;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    console.log(data);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }
  console.log(isChecked);

  return (
    <CenterSection>
      <h2>SCHADENSBERICHT ERSTELLEN</h2>
      <section>
        <form onSubmit={handleSubmit} formname="damagereports">
          <fieldset>
            <legend>
              <h3>SCHADENFORMULAR</h3>
            </legend>

            <InputDiv>
              <label htmlFor="reporterName">Ihren Name: </label>
              <FormInput
                type="text"
                id="reporterName"
                name="reporterName"
                max={30}
                required
              />
              {/* 2 */}
            </InputDiv>

            <InputDiv>
              <label htmlFor="licensePlateNumber">Autonummernschild: </label>
              <FormSelector id="licensePlateNumber" name="licensePlateNumber">
                <>
                  <option value="">--- Bitte auswählen ---</option>
                  {cars.map((car) => {
                    return (
                      <option key={car._id} value={car.licensePlateNumber}>
                        {car.licensePlateNumber}
                      </option>
                    );
                  })}
                </>
              </FormSelector>
            </InputDiv>

            <InputDiv>
              <label htmlFor="isDrivable">Ist das Auto noch fahrbar?:</label>
              <Checkbox
                name={"isDrivable"}
                value={isChecked}
                onChange={handleCheckboxChange}
              />
            </InputDiv>

            <InputDiv>
              <label htmlFor="type">Art des Schadens:</label>
              <FormSelector id="type" name="type">
                <option value="">--- Bitte auswählen ---</option>
                <option value={"body"}>Karosserie</option>
                <option value={"electrical"}>Elektrisch</option>
                <option value={"mechanical"}>Mechanisch</option>
              </FormSelector>
            </InputDiv>

            <InputDiv style={{ flexDirection: "column" }}>
              {/* 5 */}
              <label htmlFor="description">Beschreibung des Schadens:</label>
              <FullTextArea
                placeholder="Schreiben Sie eine kurze Beschreibung des Problems"
                name="description"
                id="description"
                minLength={10}
                maxLength={130}
              />
            </InputDiv>
            <InputDiv>
              <DamageImageUpload />
            </InputDiv>

            <InputDiv style={{ textAlign: "center" }}>
              <FormButton type="submit">Absenden</FormButton>
            </InputDiv>
          </fieldset>
        </form>
      </section>
    </CenterSection>
  );
}
