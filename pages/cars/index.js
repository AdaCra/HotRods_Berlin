import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import { isDrivable } from "@/components/Damages/isDrivable";

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
`;
const BrokenCar = styled.li`
display: flex;
justify-content: center;
align itmes: center;
cursor: pointer;
margin: 10px 0;
padding: 13px 50px;
height: 50px;
border-radius: 25px;
background-color: var(--background-highlight);

`;

export default function Cars() {
  const router = useRouter();
  const { data } = useSWR("/api/cars", { fallbackData: [] });

  let carAvailable;
  return (
    <section>
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
    </section>
  );
}
