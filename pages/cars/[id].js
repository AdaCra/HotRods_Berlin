import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";

import LastElementValue from "@/components/GeneralComponents/TimeDateValueCalculations/LastElementValue";
import MostRecentDateFromCreatedAtString from "@/components/GeneralComponents/TimeDateValueCalculations/MostRecentDateFromCreatedAtString";
import { isDrivable } from "@/components/carIdDamages/isDrivable";
import ShowDamageReportDetails from "@/components/carIdDamages/ShowDamageReportDetails";
import H2TextPopUp from "@/components/GeneralComponents/Loading/Loading";
import SectionDivider from "@/components/GeneralComponents/HorizontalRule/HrSectionSpacer";
import TableRow from "@/components/GeneralComponents/TableRow/TableRow";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 640px;
  padding: 0 20px;
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
  const lastDamageSeverity = LastElementValue(damageReports, "isDrivable");
  const lastDamageAffects = LastElementValue(damageReports, "isAffectsDriving");

  return (
    <>
      <CenterSection>
        <h2>FAHRZEUGDETAILS</h2>
        <h3>ALLGEMEIN</h3>
        <TableStyle>
          <tbody>
            <TableRow
              keyName={"Nummernschild"}
              keyValue={car.licensePlateNumber}
            />
            <TableRow
              keyName={"Ist fahrbar"}
              keyValue={
                carAvailable === null
                  ? "Warten auf Reparaturen"
                  : carAvailable === false
                  ? "Auto ist ganz Kapputt"
                  : "Es fährt immer noch"
              }
            />
          </tbody>
        </TableStyle>
        <h3>WARTUNGSVERLAUF</h3>
        <TableStyle>
          <tbody>
            <TableRow
              keyName={"Letzter Autoservice am"}
              keyValue={MostRecentDateFromCreatedAtString(serviceHistory)}
            />

            <TableRow
              keyName={"Beim Kilometerstand"}
              keyValue={
                LastElementValue(serviceHistory, "odometerReading") === "null"
                  ? ""
                  : `${LastElementValue(serviceHistory, "odometerReading")}km`
              }
            />
            <TableRow
              keyName={"Nächste Wartung"}
              keyValue={
                LastElementValue(serviceHistory, "odometerReading") === "null"
                  ? "1500km"
                  : `${
                      LastElementValue(serviceHistory, "odometerReading") + 1500
                    }km`
              }
            />
          </tbody>
        </TableStyle>
        <br />
        <TableStyle>
          <tbody style={{ marginTop: "10px" }}>
            <TableRow
              keyName={"Letzte Schadensmeldung"}
              keyValue={MostRecentDateFromCreatedAtString(damageReports)}
            />

            <TableRow keyName={"Art des Schadens"} keyValue={lastDamageType} />

            <TableRow
              keyName={"Funktionsunfähige Schäden"}
              keyValue={lastDamageSeverity ? "Nein" : "Ja"}
            />
          </tbody>
        </TableStyle>

        <SectionDivider />
          <h3>AKTUALISIEREN</h3>
        <ButtonSection>
          
          <FormButton
            onClick={() => {
              router.push(`/damageReport`);
            }}
          >
            SCHADEN
          </FormButton>
          <FormButton
            onClick={() => {
              router.push(`/service`);
            }}
          >
            SERVICE
          </FormButton>
        </ButtonSection>
        <SectionDivider />

        <ShowDamageReportDetails car={car} />
      </CenterSection>
    </>
  );
}
