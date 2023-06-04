import { useState } from "react";
import TimeDifference from "../TimeDateValueCalculations/TimeDifference";
import styled from "styled-components";
import ExpandingH3WithOnClickToggle from "../GeneralComponents/ExpandingH3/ExpandingH3WithOnClickToggle";
import BenzineForm from "./BenzineForm";

const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
  text-align: center;
`;

export default function BenzinePageContent({ latestEntry, handleSubmit }) {
  const [showBenzineRefill, setShowBenzineRefill] = useState(false);

  function handleShowBenzineFiller() {
    setShowBenzineRefill(
      (prevShowUnresolvedDamage) => !prevShowUnresolvedDamage
    );
  }

  const lastCount = latestEntry?.count;
  const lastIsRefill = latestEntry?.isRefill;
  const lastName = latestEntry?.name;
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
        {hoursSinceLastUpdate > 12 || !latestEntry ? (
          <BenzineForm
            handleSubmit={handleSubmit}
            formName={"update-benzine"}
            header={"NEUE ZÄHLUNG"}
            label={"AKTUALISIEREN:"}
            refill={false}
          />
        ) : (
          <h3 style={{ textAlign: "center" }}>DIE ZÄHLUNG IST AKTUEL</h3>
        )}
        <hr style={{ margin: "30px 0 25px" }} />
      </section>
      <CenterSection>
        <p>
          <em>Letzte Zahl:</em>{" "}
          <b>{lastCount ? lastCount : "Unbekannt"} Benzinkanister</b>
        </p>
        <p>
          <em>Wurde gemacht von:</em>{" "}
          <b>{!lastName ? "Unbekannt" : lastName}</b>
        </p>
        <p>
          <em>
            Vor: <b> {Math.floor(hoursSinceLastUpdate)} stunden </b>
          </em>
        </p>
        <p style={{ lineHeight: 0.1 }}>
          <em style={{ marginTop: 0, fontSize: "x-small" }}>
            {formattedTime === "Invalid Date" ? "Unbekannt" : formattedTime} Uhr
            am {formattedDate === "Invalid Date" ? "Unbekannt" : formattedDate}
          </em>
        </p>
        <hr style={{ margin: "30px 0 25px" }} />
      </CenterSection>

      {!lastIsRefill ? (
        hoursSinceLastUpdate < 12 ? (
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
                  refill={true}
                />
              </section>
            )}
          </>
        ) : (
          <h4
            style={{ textAlign: "center", color: "var(--fontColor-highlight" }}
          >
            <b>
              Bitte zählen Sie das restliche Benzin, bevor Sie nach dem Kauf
              nachfüllen
            </b>
          </h4>
        )
      ) : (
        <h4 style={{ textAlign: "center", color: "var(--fontColor-highlight" }}>
          <b>
            Bei der zuvor erfassten Zählung handelte <br />
            es sich um eine Treibstoffnachfüllung.
          </b>
        </h4>
      )}
      <hr style={{ margin: "30px 0 25px" }} />
    </CenterSection>
  );
}
