import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import { isDrivable } from "@/components/carIdDamages/isDrivable";
import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";

const FixedCar = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 20px 0;
  padding: 13px 50px;
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
  margin: 20px 0;
  padding: 13px 50px;
  height: 50px;
  border-radius: 25px;
  background-color: var(--background-highlight);
`;

const CenterSection = styled.section`
  margin: 20px auto;
  text-align: center;
`;

const SuperDiv = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

export default function Cars() {
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/cars", { fallbackData: [] });

  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;

  let carAvailable;
  return (
    <CenterSection>
      <h2>AUTO LISTE</h2>
      <ul>
        {data.map((car) => {
          carAvailable = isDrivable(car);
          const CarComponent = carAvailable ? FixedCar : BrokenCar;
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
      </ul>
      <hr style={{ margin: "30px 0 25px" }} />
      <SuperDiv>
        <Link href={"/cars/create"}>Create Car</Link>
      </SuperDiv>
    </CenterSection>
  );
}
