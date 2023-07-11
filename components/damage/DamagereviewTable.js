import styled from "styled-components";
import { useRouter } from "next/router";

import SectionDivider from "../GeneralComponents/HorizontalRule/HrSectionSpacer";
import TableRow from "../GeneralComponents/TableRow/TableRow";
import DateFromCreatedAtString from "../GeneralComponents/TimeDateValueCalculations/DateFromCreatedAtString";
import { useState } from "react";

const TableStyle = styled.table`
  margin: auto;
  width: 100%;
  height: 250px;
  max-height: 450px;
  position: relative;

  @media (max-width: 672px) {
    height: 450px;
    width: 75%;
  }
  @media (max-width: 508px) {
    width: 100%;
  }
`;

const FormButton = styled.button`
  position: absolute;
  transform: translate(-50%, -50%);
  right: auto;
  bottom: 0;
  margin: auto;
  padding-left: 1px;
  height: 20px;
  width: 20px;
  line-height: 19px;
  background-color: var(--background-highlight);
  color: var(--fontColor-highlight);
  border-radius: 15px;
  text-align: center;
  vertical-align: center;
  font-size: 1.2em;
`;
const PhotoBox = styled.div`
  margin: 0;
  margin-bottom: 20px;
  height: 226px;
  width: 100%;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 672px) {
    height: 426px;
  }
`;
const DamageImage = styled.img`
  width: 150px;
  height: 225px;
  @media (max-width: 356px) {
    width: 130px;
    height: 195px;
  }
`;
export default function CarDamageReview({ damage }) {
  const router = useRouter();
  const [showPhotos, setShowPhotos] = useState(false);

  function handlePhotoReveal() {
    setShowPhotos(!showPhotos);
    console.log(showPhotos);
  }
  return (
    <>
      <TableStyle>
        <tbody>
          {showPhotos ? (
            <TableRow
              keyValue={
                <>
                  <FormButton onClick={handlePhotoReveal}>✕</FormButton>
                  <PhotoBox>
                    {damage.photos.map((photo, index) => {
                      console.log(index + 1 + ": " + photo);
                      return (
                        <DamageImage
                          key={index}
                          src={photo}
                          alt={`Schaden foto ${index + 1}`}
                          width={150}
                          height={225}
                        />
                      );
                    })}
                  </PhotoBox>
                </>
              }
            />
          ) : (
            <>
              <TableRow
                keyName={"Autonummernschild"}
                keyValue={damage.licensePlateNumber}
                Click={() => router.push(`/cars/${damage.carId}`)}
                // router.push
              />
              <TableRow
                keyName={"Datum des Berichts"}
                keyValue={DateFromCreatedAtString(damage.createdAt)}
              />
              <TableRow
                keyName={"Berichtet von"}
                keyValue={damage.reporterName}
              />
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
              <TableRow
                keyValue={"Fotos zeigen"}
                Click={() => handlePhotoReveal()}
              />
            </>
          )}
        </tbody>
      </TableStyle>
      <SectionDivider />
      {console.log(showPhotos)}
    </>
  );
}
