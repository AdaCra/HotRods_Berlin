import { useState } from "react";
import CarIdServicehistory from "./carIdServiceHistory";
import styled from "styled-components";

const OpenButton = styled.button`
  background-color: var(--fontColor-highlight);
  color: var(--background-highlight);
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 45px;
  text-align: center;
  width: 300px;
`;

export default function ShowServiceHistoryDetails({ car }) {
  const [showServiceHistory, setShowServiceHistory] = useState(false);

  function handleShowServiceHistory() {
    setShowServiceHistory((prevShowServiceHistory) => !prevShowServiceHistory);
  }

  return (
    <>
      <h3>Serviceverlauf</h3>
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
  );
}
