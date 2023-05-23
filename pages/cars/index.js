import { useRouter } from "next/router";
import useSWR from "swr";

export default function Cars() {
  const router = useRouter();
  const { carData } = useSWR("/api/cars", { fallbackData: [] });
  const { damageData } = useSWR("/api/damage", { fallbackData: [] });
  console.log("carData: ", carData);
  console.log("damageData: ", damageData);
  return (
    <>
      <p>cars</p>
    </>
  );
}
