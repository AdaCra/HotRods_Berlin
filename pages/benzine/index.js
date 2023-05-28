import BenzineForm from "@/components/Forms/BenzineForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Benzine() {
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/benzine", { fallbackData: [] });
  const { mutate } = useSWR("/api/benzine");

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  let hours = 0;

  const lastCount = data[data.length - 1]?.count;
  const createAtTimestamp = new Date(data[data.length - 1]?.createdAt);
  const formattedDate = createAtTimestamp.toLocaleDateString("en-GB");
  const formattedTime = createAtTimestamp.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  async function updateBenzine(benzineCount) {
    const response = await fetch("/api/benzine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(benzineCount),
    });

    if (response.ok) {
      await response.json();
      mutate();
    } else {
      console.error(`Error: ${response.status}`);
    }
    router.push("/benzine");
  }
  return (
    <>
      <h2 id="update-benzine">Benzinestände</h2>
      <p>
        Letzte Aktualisierung:{" "}
        <b>
          {formattedTime === "Invalid Date" ? "Loading" : formattedTime},{" "}
          {formattedDate === "Invalid Date" ? "Loading" : formattedDate}
        </b>
        <br />
        Letzte Zahl: <b>{lastCount ? lastCount : "Loading"}</b> Benzinkanister
      </p>
      <BenzineForm
        onSubmit={updateBenzine}
        formName={"update-benzine"}
        createAtTimestamp={createAtTimestamp}
        hoursSinceLastUpdate={hours}
      />
    </>
  );
}
