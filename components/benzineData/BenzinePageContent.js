import { useState } from "react";
import TimeDifference from "../TimeDateValueCalculations/TimeDifference";
import styled from "styled-components";
import ExpandingH3WithOnClickToggle from "../GeneralComponents/ExpandingH3/ExpandingH3WithOnClickToggle";
import BenzineForm from "./BenzineForm";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;

export default function BenzinePageContent({ latestEntry, handleSubmit }) {
  const [showBenzineRefill, setShowBenzineRefill] = useState(false);

  function handleShowBenzineFiller() {
    setShowBenzineRefill(
      (prevShowUnresolvedDamage) => !prevShowUnresolvedDamage
    );
  }

  const lastCount = latestEntry?.count;
  const createAtTimestamp = new Date(latestEntry?.createdAt);
  const formattedDate = createAtTimestamp.toLocaleDateString("en-GB");
  const formattedTime = createAtTimestamp.toLocaleTimeString("en-US", {
    // timeStyle: "short",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const hoursSinceLastUpdate = TimeDifference(createAtTimestamp);

  return (
    <CenterSection>
      <h2>BENZINESTÄNDE</h2>
      <section>
        {hoursSinceLastUpdate > 12 ? (
          <BenzineForm
            handleSubmit={handleSubmit}
            formName={"update-benzine"}
            header={"NEUE ZÄHLUNG"}
            label={"AKTUALISIEREN:"}
          />
        ) : (
          <h3 style={{ textAlign: "center" }}>DIE ZÄHLUNG IST AKTUEL</h3>
        )}
        <hr style={{ margin: "30px 0 25px" }} />
      </section>
      <section>
        <p>
          <b>Letzte Aktualisierung: </b>
          {formattedTime === "Invalid Date" ? "Loading" : formattedTime} Uhr am{" "}
          {formattedDate === "Invalid Date" ? "Loading" : formattedDate}
        </p>
        <p>
          <b>Letzte Zahl:</b> {lastCount ? lastCount : "Loading"} Benzinkanister
        </p>
        <p>
          <em>
            {Math.floor(hoursSinceLastUpdate)} stunden seit der letzten
            Aktualisieren
          </em>
        </p>
        <hr style={{ margin: "30px 0 25px" }} />
      </section>
      {hoursSinceLastUpdate < 12 ? (
        <>
          <ExpandingH3WithOnClickToggle
            title={"AUFFÜLLEN"}
            onClickFunction={handleShowBenzineFiller}
          />
          {showBenzineRefill && (
            <section>
              <BenzineForm
                handleSubmit={handleSubmit}
                formName={"benzineCount"}
                label={"AUFGEFÜLLTE ANZAHL:"}
              />
            </section>
          )}
        </>
      ) : (
        <h4 style={{ textAlign: "center", color: "var(--fontColor-highlight" }}>
          <b>
            Bitte zählen Sie das restliche Benzin, bevor Sie nach dem Kauf
            nachfüllen
          </b>
        </h4>
      )}
      <hr style={{ margin: "30px 0 25px" }} />
    </CenterSection>
  );
}
