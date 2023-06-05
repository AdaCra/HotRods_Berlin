import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";

import LastElementValue from "@/components/GeneralComponents/TimeDateValueCalculations/LastElementValue";
import MostRecentDateFromCreatedAtString from "@/components/GeneralComponents/TimeDateValueCalculations/MostRecentDateFromCreatedAtString";
import { isDrivable } from "@/components/carIdDamages/isDrivable";
import ShowDamageReportDetails from "@/components/carIdDamages/ShowDamageReportDetails";
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

export default function DetailsPage() {
  const router = useRouter();

  const { isReady } = router;
  const { id } = router.query;

  const { data: car, isLoading, error } = useSWR(`/api/cars/${id}`);
  if (!isReady || isLoading || error) return <H2TextPopUp text="LOADING..." />;

  const carAvailable = isDrivable(car);
  const { serviceHistory, damageReports } = car;
  const lastDamageType = LastElementValue(damageReports, "type");

 
  return (
    <>
      <CenterSection>
        <h2>FAHRZEUGDETAILS</h2>
        <h3>ALLGEMEIN</h3>
        <TableStyle>
          <tbody>
            <tr>
              <TableData>Nummernschild</TableData>
              <TableData>{car.licensePlateNumber}</TableData>
            </tr>
            <tr>
              <TableData>Ist fahrbar</TableData>
              <TableData>
                {carAvailable ? "Ist fahrbar" : "Warten auf Reparaturen"}
              </TableData>
            </tr>
          </tbody>
        </TableStyle>
        <h3>WARTUNGSVERLAUF</h3>
        <TableStyle>
          <tbody>
            <tr>
              <TableData>Letzter Autoservice am</TableData>
              <TableData>
                {MostRecentDateFromCreatedAtString(serviceHistory)}
              </TableData>
            </tr>
            <tr>
              <TableData>Beim Kilometerstand</TableData>
              <TableData>
                {LastElementValue(serviceHistory, "odometerReading")}km
              </TableData>
            </tr>

            <tr>
              <TableData>Letzte Schadensmeldung</TableData>
              <TableData>
                {MostRecentDateFromCreatedAtString(damageReports)}
              </TableData>
            </tr>
            <tr>
              <TableData>Art des Schadens</TableData>
              <TableData>
                {lastDamageType === "mechanical"
                  ? "Mechanisch"
                  : lastDamageType === "electrical"
                  ? "Elektrisch"
                  : lastDamageType === "body"
                  ? "Karosserie"
                  : "Unbekannt"}
              </TableData>
            </tr>
          </tbody>
        </TableStyle>

        <hr style={{ margin: "30px 0 25px" }} />
        <ButtonSection>
          <FormButton onClick={() => {
                router.push(`/damageReport`);
              }}>SCHADEN</FormButton>
          <FormButton onClick={() => {
                router.push(`/service`);
              }}>SERVICE</FormButton>
        </ButtonSection>
        <hr style={{ margin: "30px 0 25px" }} />

        <ShowDamageReportDetails car={car} />
      </CenterSection>
    </>
  );
}
