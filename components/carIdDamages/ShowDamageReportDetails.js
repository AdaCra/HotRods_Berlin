import { useState } from "react";
import CarIdDamageReports from "./carIdDamageReports";
import ExpandingH3WithOnClickToggle from "../GeneralComponents/ExpandingH3/ExpandingH3WithOnClickToggle";
import CarIdServicehistory from "../carIdServices/carIdServiceHistory";

export default function ShowUnresolvedDamageDetails({ car }) {
  const [showUnresolvedDamage, setShowUnresolvedDamage] = useState(false);
  const [showResolvedDamage, setShowResolvedDamage] = useState(false);
  const [showServiceHistory, setShowServiceHistory] = useState(false);

  function handleShowUnresolvedDamage() {
    setShowUnresolvedDamage(
      (prevShowUnresolvedDamage) => !prevShowUnresolvedDamage
    );
  }
  function handleShowResolvedDamage() {
    setShowResolvedDamage((prevShowResolvedDamage) => !prevShowResolvedDamage);
  }
  function handleShowServiceHistory() {
    setShowServiceHistory((prevShowServiceHistory) => !prevShowServiceHistory);
  }

  return (
    <>
      <ExpandingH3WithOnClickToggle
        title={"UNGELÖSTE SCHÄDENS"}
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
        title={"GELÖSTE SCHÄDENS"}
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
