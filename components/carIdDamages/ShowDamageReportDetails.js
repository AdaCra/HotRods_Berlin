import { useState } from "react";
import CarIdDamageReports from "./carIdDamageReports";
import ExpandingH3WithOnClickToggle from "../GeneralComponents/ExpandingH3WithOnClickToggle";
import CarIdServicehistory from "../carIdServices/carIdServiceHistory";

export default function ShowUnresolvedDamageDetails({ car }) {
  const [showUnresolvedDamage, setShowUnresolvedDamage] = useState(false);
  const [showResolvedDamage, setShowResolvedDamage] = useState(false);
  const [showServiceHistory, setShowServiceHistory] = useState(false);

  function handleShowServiceHistory() {
    setShowServiceHistory((prevShowServiceHistory) => !prevShowServiceHistory);
  }
  function handleShowUnresolvedDamage() {
    setShowUnresolvedDamage(
      (prevShowUnresolvedDamage) => !prevShowUnresolvedDamage
    );
  }
  function handleShowResolvedDamage() {
    setShowResolvedDamage((prevShowResolvedDamage) => !prevShowResolvedDamage);
  }

  return (
    <>
      <ExpandingH3WithOnClickToggle
        title={"UNGELÖSTE SCHADENSBERICHTE"}
        onClickFunction={handleShowUnresolvedDamage}
      />
      {showUnresolvedDamage && (
        <CarIdDamageReports
          dataSet={car}
          resolvedFilter={false}
          title={"ungelösten"}
        />
      )}

      <ExpandingH3WithOnClickToggle
        title={"GELÖSTE SCHADENSBERICHTE"}
        onClickFunction={handleShowResolvedDamage}
      />
      {showResolvedDamage && (
        <CarIdDamageReports
          dataSet={car}
          resolvedFilter={true}
          title={"gelösten"}
        />
      )}

      <ExpandingH3WithOnClickToggle
        title={"SERVICEVERLAUF"}
        onClickFunction={handleShowServiceHistory}
      />
      {showServiceHistory && <CarIdServicehistory car={car} />}
    </>
  );
}
