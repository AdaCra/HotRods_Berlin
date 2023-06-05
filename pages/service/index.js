import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;
const ButtonSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TableStyle = styled.table`
  margin: auto;
  width: 100%;
`;
const TableData = styled.td`
  width: 50%;
  border: 1px solid var(--background-highlight);
  text-align: left;
  vertical-align: center;
`;
const FormButton = styled.button`
  margin: auto;
  padding: 0;
  height: 45px;
  line-height: 45px;
  width: 120px;
  background-color: var(--fontColor-highlight);
  color: var(--background-highlight);
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;
`;

export default function Service() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: service, isLoading, error } = useSWR(`/api/service`);
  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;

  return (
    <CenterSection>
      <h2>FAHRZEUGDETAILS</h2>
    </CenterSection>
  );
}
