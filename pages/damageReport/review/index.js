import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";

import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";
import SectionDivider from "@/components/GeneralComponents/HorizontalRule/HrSectionSpacer";
import CarDamageReview from "@/components/damage/DamagereviewTable";

const CenterSection = styled.section`
  margin: 15px auto;
  padding: 0 15px;
  width: 800px;
`;

export default function DamagesReview() {
  const router = useRouter();
  const { isReady } = router;
  const {
    data: damageList,
    isLoading,
    error,
  } = useSWR("/api/damage", {
    fallbackData: [],
  });

  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;
  return (
    <CenterSection>
      {damageList.length > 0 ? (
        <h2>List des Schaden</h2>
      ) : (
        <h2>Keine Schadensberichte aufgeführt</h2>
      )}

      <SectionDivider />
      {damageList?.map((damage) => (
        <CarDamageReview key={damage._id} damage={damage} />
      ))}
    </CenterSection>
  );
}
