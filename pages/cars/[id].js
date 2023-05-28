import Image from "next/image";
import Link from "next/link";
import { get } from "mongoose";
import { useRouter } from "next/router.js";
import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

import CarIdServicehistory from "@/components/Lists/carIdServiceHistory";
import LastElementValue from "@/components/ServiceAndDamage/LastElementValue";
import MostRecentDateFromCreatedAtString from "@/components/ServiceAndDamage/MostRecentDateFromCreatedAtString";
import { isDrivable } from "@/components/Damages/isDrivable";

const TableSection = styled.section`
  margin: auto;
  width: 60%;
  min-width: 900px;
`;
const TableStyle = styled.table`
  margin: 15px;
  width: 50%;
  border-collapse: collapse;
  border-spacing: 0;
`;
const TableData = styled.td`
  width: 50%;
  border: 1px solid var(--background-highlight);
  text-align: left;
  vertical-align: center;
`;

const OpenButton = styled.button`
  background-color: var(--fontColor-highlight);
  color: var(--background-highlight);
  margin-top: 20px;
  padding: 10px 20px;
  border-radius:45px;
  text-align: center;
  width:300px;
`;

export default function DetailsPage() {
  const router = useRouter();
  const [showServiceHistory, setShowServiceHistory] = useState(false);
  const [showDamageReports, setShowDamageReports] = useState(false);
  const { isReady } = router;
  const { id } = router.query;

  const { data: car, isLoading, error } = useSWR(`/api/cars/${id}`);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  const carAvailable = isDrivable(car);
  const { serviceHistory, damageReports } = car;
  const lastDamageType = LastElementValue(damageReports, "type");

  function handleShowServiceHistory() {
    setShowServiceHistory((prevShowServiceHistory) => !prevShowServiceHistory);
  }

  function handleShowDamageReports() {
    setShowDamageReports((prevShowDamageReports) => !prevShowDamageReports);
  }

  return (
    <>
      <TableSection>
        <h2 style={{ textAlign: "left", textDecoration: "underline" }}>
          FAHRZEUGDETAILS
        </h2>
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
                {LastElementValue(serviceHistory, "odometerReading")}
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
                  ? "mechanisch"
                  : lastDamageType === "electrical"
                  ? "elektrisch"
                  : lastDamageType === "body"
                  ? "Karosserie"
                  : "Unbekannt"}
              </TableData>
            </tr>
          </tbody>
        </TableStyle>
        <>
          <h3>ServiceVerlauf</h3>
          {car.serviceHistory.length > 0 ? (
            <OpenButton
              onClick={() => {
                handleShowServiceHistory();
              }}
            >
              {showServiceHistory
                ? "Fahrzeugserviceverlauf ausblenden"
                : "Fahrzeugserviceverlauf anzeigen"}
            </OpenButton>
          ) : (
            <button>Dieses Auto hat keine Serviceverlauf</button>
          )}
          {showServiceHistory && (
            <>
              <CarIdServicehistory car={car} />
              <OpenButton
                onClick={() => {
                  handleShowServiceHistory();
                }}
              >
                Fahrzeugserviceverlauf ausblenden
              </OpenButton>
            </>
          )}
        </>
      </TableSection>
    </>
  );
}
