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
  const [isDrivableCheck, setIsDrivableCheck] = useState(true);
  const [isAffectsDrivingCheck, setIsAffectsDrivingCheck] = useState(false);
  const router = useRouter();
  const { isReady } = router;
  const {
    data: cars,
    isLoading: carLoading,
    error: carError,
  } = useSWR("/api/cars", { fallbackData: [] });
  let ImageUploadArray;
  if (!isReady || carLoading || carError)
    return <H2TextPopUp text="LOADING..." />;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.isDrivable = isDrivableCheck;
    data.isAffectsDriving = isAffectsDrivingCheck;
    data.photo = ImageUploadArray;
    onSubmit(data);

    const car = cars.find(
      (car) => car.licensePlateNumber === data.licensePlateNumber
    );
    router.push(`/cars/${car._id}`);
  }

  function handleCheckboxChange(set, is) {
    set(!is);
  }

  return (
    <CenterSection>
      <h2>SCHADENSBERICHT ERSTELLEN</h2>
      <section>
        <FormStyled onSubmit={handleSubmit} formname="damagereports">
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
              <Checkbox
                label={"Ist das Auto noch fahrbar?:"}
                name={"isDrivable"}
                value={isDrivableCheck}
                onChange={() =>
                  handleCheckboxChange(setIsDrivableCheck, isDrivableCheck)
                }
                disabled={false}
              />
            </InputDiv>
            <InputDiv>
              <Checkbox
                label={"Der Schaden beeinträchtigt das Fahrverhalten?:"}
                name={"isAffectsDriving"}
                value={isAffectsDrivingCheck}
                onChange={() =>
                  handleCheckboxChange(
                    setIsAffectsDrivingCheck,
                    isAffectsDrivingCheck
                  )
                }
                disabled={!isDrivableCheck}
              />
            </InputDiv>

            <InputDiv>
              <label htmlFor="type">Art des Schadens:</label>
              <FormSelector id="type" name="type">
                <option value="">--- Bitte auswählen ---</option>
                <option value={"Karosserie"}>Karosserie</option>
                <option value={"Elektrisch"}>Elektrisch</option>
                <option value={"Mechanisch"}>Mechanisch</option>
              </FormSelector>
            </InputDiv>

            <InputDiv style={{ flexDirection: "column" }}>
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
              <DamageImageUpload ImageArray={ImageUploadArray} />
            </InputDiv>

            <InputDiv style={{ textAlign: "center" }}>
              <FormButton type="submit">Absenden</FormButton>
            </InputDiv>
          </fieldset>
        </FormStyled>
      </section>
    </CenterSection>
  );
}
