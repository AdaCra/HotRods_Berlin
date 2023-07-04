import styled from "styled-components";
import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";
import { useRouter } from "next/router";
import useSWR from "swr";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 400px;
  padding: 0 15px;
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

const InputDiv = styled.div`
  margin-left: auto;
  padding: 0px;
  border: 2px solid var(--fontColor-highlight);
  border-radius: 15px;
  background-color: var(--background);
`;
const PrefixInput = styled.input`
  margin: 0 auto;
  height: 45px;
  line-height: 45px;
  background-color: transparent;
  width: 50px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
const NumberInput = styled.input`
  margin: auto;
  height: 45px;
  line-height: 45px;
  width: 50px;
  background-color: transparent;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const DivSection = styled.section`
  display: flex;
  align-items: center;
  justfiy-content: space-between;
`;

export default function CreateCars() {
  const router = useRouter();
  const { isReady } = router;
  const {
    data: carData,
    isLoading,
    error,
  } = useSWR("/api/cars", { fallbackData: [] });
  const { mutate } = useSWR("/api/cars");

  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;

  async function AddCar(car) {
    const response = await fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (response.ok) {
      await response.json();
      mutate();
    } else {
      console.error(`Error: ${response.status}`);
    }
    router.push("/cars");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const licensePlate = {
      licensePlateNumber: `${data.licensePlatePrefix.toUpperCase()} ${
        data.licensePlateDigits
      }`,
    };
    AddCar(licensePlate);
  }

  return (
    <CenterSection>
      <h2>AUTOANMELDUNG</h2>
      <section>
        <form onSubmit={handleSubmit} formname="damagereports">
          <fieldset>
            <legend>
              <h3>AUTODETAIL</h3>
            </legend>
            <DivSection>
              <label htmlFor="licensePlatePrefix">Nummernschild: </label>
              <InputDiv>
                <PrefixInput
                  type="text"
                  name="licensePlatePrefix"
                  id="licensePlatePrefix"
                  placeholder="AAA"
                  pattern="[A-Za-z]+"
                  minLength={3}
                  maxLength={3}
                  required
                />
                <NumberInput
                  type="number"
                  name="licensePlateDigits"
                  id="licensePlateDigits"
                  placeholder="999"
                  min={0}
                  max={999}
                  required
                />
              </InputDiv>
            </DivSection>
          </fieldset>
          <FormButton type="submit">Absenden</FormButton>
        </form>
      </section>
    </CenterSection>
  );
}
