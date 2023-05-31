import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";
import BenzinePageContent from "@/components/benzineData/BenzinePageContent";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;

export default function Benzine() {
  const router = useRouter();
  const { isReady } = router;
  const {
    data: benzineData,
    isLoading,
    error,
  } = useSWR("/api/benzine", { fallbackData: [] });
  const { mutate } = useSWR("/api/benzine");

  if (!isReady || isLoading || error)
    return (
      <H2TextPopUp text = "LOADING..."/>
    );

  const latestEntry = benzineData[benzineData.length - 1];

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

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    updateBenzine(data);
  }

  return (
    <BenzinePageContent latestEntry={latestEntry} handleSubmit={handleSubmit} />
  );
}
