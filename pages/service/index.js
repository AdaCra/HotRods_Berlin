import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";
import { useState } from "react";
import SectionDivider from "@/components/GeneralComponents/HorizontalRule/HrSectionSpacer";
import MotorSelectors from "@/components/services/CreateCheckboxSelectors/MotorSelectors";
import ElektrikSelectors from "@/components/services/CreateCheckboxSelectors/ElektrikSelectors";
import MechanikSelectors from "@/components/services/CreateCheckboxSelectors/MechanikSelector";
const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;

const NumberInput = styled.input`
  width: 250px;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
  text-align: center;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
export const FormInput = styled.input`
  width: 250px;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
  text-align: center;
`;
export const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;
export const FormSelector = styled.select`
  width: 250px;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
  text-align: center;
`;
export const FormButton = styled.button`
  margin: 15px auto 0px;
  padding: 0;
  height: 45px;
  line-height: 45px;
  width: 120px;
  background-color: var(--fontColor-highlight);
  color: var(--background-highlight);
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;
`;

export default function Service() {
  const router = useRouter();
  const { isReady } = router;
  const { mutate } = useSWR("/api/damage");

  const [showMotorService, setShowMotorService] = useState(false);
  const [motorData, setMotorData] = useState({
    Öl: false,
    Kühlmittel: false,
    Ölfilter: false,
    Luftfilter: false,
    Kraftstofffilter: false,
    Keilriemen: false,
    Zahnriemen: false,
  });

  const [showElektrikService, setShowElektrikService] = useState(false);
  const [elektrikData, setElektrikData] = useState(false);

  const [showMechanikService, setShowMechanikService] = useState(false);
  const [mechanikData, setMechanikData] = useState(false);

  function handleCheckboxChange(set, is) {
    set((prevState) => !prevState);
    console.log("handlechange:", is);
  }

  const {
    data: cars,
    isLoading: carLoading,
    error: carError,
  } = useSWR("/api/cars", { fallbackData: [] });
  const { data: service, isLoading, error } = useSWR(`/api/service`);
  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;

  function handleSubmit(data) {
    console.log(data);
  }

  function handleShowMotorServiceDetails() {
    setShowMotorService(!showMotorService);
    setShowElektrikService(false);
    setShowMechanikService(false);
  }
  function handleShowElektrikServiceDetails() {
    setShowElektrikService(!showElektrikService);
    setShowMotorService(false);
    setShowMechanikService(false);
  }

  function handleShowMechanikServiceDetails() {
    setShowMechanikService(!showMechanikService);
    setShowMotorService(false);
    setShowElektrikService(false);
  }
  async function submitService(report) {
    console.table(report);
    // const response = await fetch("/api/service", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(report),
    // });
    // if (response.ok === true) {
    //   await response.json();
    //   mutate();
    //   alert("Service gemeldet");
    // } else {
    //   console.log(`Error: ${response.status}`);
    // }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.Motor = motorData;
    data.Eletrik = elektrikData;
    data.Mechanik = mechanikData;
    submitService(data);

    const car = cars.find(
      (car) => car.licensePlateNumber === data.licensePlateNumber
    );
    // router.push(`/cars/${car._id}`);
    router.push(`/service`);
  }

  return (
    <CenterSection>
      <h2>FAHRZEUGDETAILS</h2>
      <form onSubmit={handleSubmit} formname="damagereports">
        <fieldset>
          <legend>
            <h3>SERVICEFORMULAR</h3>
          </legend>

          <InputDiv>
            <label htmlFor="mechanicName">Ihren Name: </label>
            <FormInput
              type="text"
              id="mechanicName"
              name="mechanicName"
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
            <label htmlFor="odometerReading">Kilometerstand: </label>
            <NumberInput
              type="number"
              id="odometerReading"
              name="odometerReading"
              required
            />
          </InputDiv>
        </fieldset>
        <SectionDivider />
        <h4>Details zum Service</h4>
        <SectionDivider />
        <fieldset>
          <MotorSelectors
            setGroup={setMotorData}
            handleShowMotorServiceDetails={handleShowMotorServiceDetails}
            showMotorService={showMotorService}
          />
          <ElektrikSelectors
            setGroup={setElektrikData}
            handleShowElektrikServiceDetails={handleShowElektrikServiceDetails}
            showElektrikService={showElektrikService}
          />
          <MechanikSelectors
            setGroup={setMechanikData}
            handleShowMechanikServiceDetails={handleShowMechanikServiceDetails}
            showMechanikService={showMechanikService}
          />
        </fieldset>
        <SectionDivider />
        <InputDiv>
          <FormButton type="submit">Absenden</FormButton>
        </InputDiv>
      </form>
    </CenterSection>
  );
}
