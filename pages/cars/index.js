import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import filterAndSplitDamageReportsByCarId from "@/components/DamageReportsFilter/filterAndSplitDamageReportsByCarId";

export default function Cars() {
  const router = useRouter();
  const { data: carData } = useSWR("/api/cars", { fallbackData: [] });
  const { data: damageData } = useSWR("/api/damage", { fallbackData: [] });
  let isBroken;

  console.log(IsItDrivable(damageData, carData));
  console.log("carData : ", carData);
  console.log("damageData : ", damageData);
  return (
    <section>
      <ul>
        {carData.map((car) => {
          return (
            <li key={car._id} className="carList__carPlate">
              <Link href={`/cars/${car._id}`}>{car.licensePlateNumber}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
