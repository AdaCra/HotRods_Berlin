import CreateDamageForm from "@/components/damage/createDamageForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DamageReport() {
  const router = useRouter();
  const { mutate } = useSWR("/api/damage");

  async function reportDamage(report) {
    
    const response = await fetch("/api/damage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    });
    if (response.ok === true) {
      await response.json();
      mutate();
      alert("Shadensbericht gemeldet");
    } else {
      console.log(`Error: ${response.status}`);
    }}

    // router.push("/damageReport");
  

  return <CreateDamageForm onSubmit={reportDamage} />;
}
