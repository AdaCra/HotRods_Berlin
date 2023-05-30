import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";

const CenterSection = styled.section`
  margin: 20px auto;
`;


export default function Cars() {
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/damage", { fallbackData: [] });

  if (!isReady || isLoading || error)
    return (
      <CenterSection>
        <h2>Loading...</h2>
      </CenterSection>
    );

  return (
  <CenterSection>
    <h2>SCHADENSBERICHTE</h2>
  </CenterSection>)}