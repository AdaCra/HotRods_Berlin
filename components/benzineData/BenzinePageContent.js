import { useState } from "react";
import { useRouter } from "next/router";
import TimeDifference from "../TimeDateValueCalculations/TimeDifference";
import styled from "styled-components";
import ExpandingH3WithOnClickToggle from "../GeneralComponents/ExpandingH3WithOnClickToggle";
import BenzineForm from "./BenzineForm";

const FormSection = styled.section`
  margin: 20px auto;
`;
const FormStyled = styled.form`
display: flex
flex-direction:column;
text-align: center;
`;
const FormInput = styled.input`
  margin: auto;
  padding: 0;
  height: 45px;
  line-height: 45px;
  width: 120px;
  background-color: black;
  border: 2px solid var(--fontColor-highlight);
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
const FormButton = styled.button`
  margin: auto;
  margin-left: 10px;
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

const ExpanderDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default function BenzinePageContent({ latestEntry, handleSubmit }) {
  const router = useRouter();
  const [showBenzineRefill, setShowBenzineRefill] = useState(false);
  const redirectToHomePage = () => {
    router.push("/");
  };

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
    <FormSection>
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
          <h3 onClick={redirectToHomePage}>Die Zählung ist aktuell</h3>
        )}
        <hr style={{ margin: "50px 0 25px" }} />
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
      <ExpanderDiv>
        <ExpandingH3WithOnClickToggle
          title={"AUFFÜLLEN"}
          onClickFunction={handleShowBenzineFiller}
        />
      </ExpanderDiv>
      {showBenzineRefill && (
        <section>
          <BenzineForm
            handleSubmit={handleSubmit}
            formName={"benzineRefill"}
            label={"AUFGEFÜLLTE ANZAHL:"}
          />
        </section>
      )}
      <hr style={{ margin: "50px 0 25px" }} />
    </FormSection>
  );
}
