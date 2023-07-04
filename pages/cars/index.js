import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import { isDrivable } from "@/components/carIdDamages/isDrivable";
import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";
import SectionDivider from "@/components/GeneralComponents/HorizontalRule/HrSectionSpacer";

const CenterSection = styled.section`
  margin: 15px auto;
  padding: 0 15px;
  width: 600px;
`;
const FixedCar = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
  padding: 13px 50px;
  max-width: 200px;
  height: 50px;
  border-radius: 25px;
  background-color: var(--fontColor-highlight);
  color: var(--fontColor-onHighlight);
`;
const BrokenCar = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
  padding: 13px 50px;
  max-width: 200px;
  height: 50px;
  border-radius: 25px;
  background-color: var(--background-highlight);
`;
const DamagedCar = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
  padding: 13px 50px;
  max-width: 200px;
  height: 50px;
  border-radius: 25px;
  background-color: var(--background-highlight);
  box-shadow: inset 0px 0px 10px 5px var(--fontColor-highlight);
`;

const GridUL = styled.ul`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
`;

export default function Cars() {
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/cars", { fallbackData: [] });

  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;

  return (
    <CenterSection>
      <h2>AUTO LISTE</h2>
      <GridUL>
        {data.map((car) => {
          const carAvailable = isDrivable(car);
          const CarComponent =
            carAvailable === null
              ? DamagedCar
              : carAvailable === true
              ? FixedCar
              : BrokenCar;
          return (
            <CarComponent
              key={car._id}
              className={`carList__carPlate `}
              onClick={() => {
                router.push(`/cars/${car._id}`);
              }}
            >
              <p>
                <b>{car.licensePlateNumber}</b>
              </p>
            </CarComponent>
          );
        })}
      </GridUL>
      <SectionDivider />
      <div>
        <h2>
          <Link href={"/cars/create"}>AUTO HINZUFLÜGEN</Link>
        </h2>
      </div>
    </CenterSection>
  );
}
