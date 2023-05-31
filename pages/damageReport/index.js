import CreateDamageForm from "@/components/damage/createDamageForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DamageReport() {
  const router = useRouter();
  const { isReady } = router;
  const {
    data: damageData,
    isLoading,
    error,
  } = useSWR("/api/damage", { fallbackData: [] });
  const { mutate } = useSWR("/api/damage");


async function reportDamage(report) {
  const response = await fetch("/api/damage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });

  if (response.ok) {
    await response.json();
    mutate();
  } else {
    console.error(`Error: ${response.status}`);
  }
  router.push("/damage");
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  reportDamage(data);
}
return <CreateDamageForm handleSubmit={handleSubmit} />
}