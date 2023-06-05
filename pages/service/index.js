import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;
const ButtonSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TableStyle = styled.table`
  margin: auto;
  width: 100%;
`;
const TableData = styled.td`
  width: 50%;
  border: 1px solid var(--background-highlight);
  text-align: left;
  vertical-align: center;
`;
const FormButton = styled.button`
  margin: auto;
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

export default function Service() {
  const router = useRouter();
  const { isReady } = router;
  const {
    data: cars,
    isLoading: carLoading,
    error: carError,
  } = useSWR("/api/cars", { fallbackData: [] });
  const { data: service, isLoading, error } = useSWR(`/api/service`);
  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;

  return (
    <CenterSection>
      <h2>FAHRZEUGDETAILS</h2>
      <form onSubmit={""} formname="damagereports">
        <fieldset>
          <legend>
            <h3>SCHADENFORMULAR</h3>
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
      </form>
    </CenterSection>
  );
}
