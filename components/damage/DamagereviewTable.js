import styled from "styled-components";
import { useRouter } from "next/router";

import SectionDivider from "../GeneralComponents/HorizontalRule/HrSectionSpacer";
import TableRow from "../GeneralComponents/TableRow/TableRow";
import DateFromCreatedAtString from "../GeneralComponents/TimeDateValueCalculations/DateFromCreatedAtString";
import { useState } from "react";

const TableStyle = styled.table`
  margin: auto;
  width: 100%;
  padding: 15px;
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

export default function CarDamageReview({ damage }) {
  const router = useRouter();
  const [showPhotos, setShowPhotos] = useState(false);

  function handlePhotoReveal() {
    setShowPhotos(!showPhotos);
  }
  return (
    <>
      <TableStyle>
        <tbody>
          <TableRow
            keyName={"Autonummernschild"}
            keyValue={damage.licensePlateNumber}
            Click={() => console.log(`/cars/${damage.carId}`)}
            // router.push
          />
          <TableRow
            keyName={"Datum des Berichts"}
            keyValue={DateFromCreatedAtString(damage.createdAt)}
          />
          <TableRow keyName={"Berichtet von"} keyValue={damage.reporterName} />
          <TableRow
            keyName={"Inoperabler Schaden"}
            keyValue={damage.isDrivable ? "Nein" : "Doch"}
          />
          <TableRow
            keyName={"Berichtsbeschreibung"}
            keyValue={damage.description}
          />
          <TableRow
            keyName={"Ist gelöst"}
            keyValue={damage.isResolved ? "Doch" : "Nein"}
          />
          <TableRow keyValue={"Fotos"} Click={() => console.log("clicked")} />
        </tbody>
      </TableStyle>
      <SectionDivider />
      {console.log(showPhotos)}
    </>
  );
}
