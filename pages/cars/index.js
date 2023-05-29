import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import { isDrivable } from "@/components/carIdDamages/isDrivable";

const FixedCar = styled.li`
  display: flex;
  justify-content: center;
  align itmes: center;
  cursor: pointer;
  margin: 10px 0;
  padding: 13px 50px;
  height: 50px;
  border-radius: 25px;
  background-color: var(--fontColor-highlight);
  color: var(--fontColor-onHighlight)
`;
const BrokenCar = styled.li`
display: flex;
justify-content: center;
align items: center;
cursor: pointer;
margin: 10px 0;
padding: 13px 50px;
height: 50px;
border-radius: 25px;
background-color: var(--background-highlight);
`;

const CenterSection = styled.ul`
  margin: 20px auto;
`;

export default function Cars() {
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/cars", { fallbackData: [] });

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  let carAvailable;
  return (
    <CenterSection>
      <h2>Auto Liste</h2>
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
              <p>{car.licensePlateNumber}</p>
            </CarComponent>
          );
        })}
      </ul>
    </CenterSection>
  );
}
