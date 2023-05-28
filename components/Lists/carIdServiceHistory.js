import styled from "styled-components";
import DateFromCreatedAtString from "../ServiceAndDamage/DateFromCreatedAtString copy";

const ServiceTableSection = styled.section`
  margin: 0;
  width: 100%;
`;
const ServiceDetailBody = styled.section`
display: flex;
flex-wrap: wrap;
align-content: space-between;
gap: 8.5%;
width: 50%;
padding 15px 1%;
border: 1px solid var(--background-highlight);
`;
const ServiceTableStyle = styled.table`
  width: 100%;
`;
const ServiceDiv = styled.div`
  width: 200px;
`;

const ServiceTableData = styled.td`
  width: 150px;
  border: 1px solid var(--background-highlight);
  text-align: left;
  vertical-align: center;
`;
const ServiceTableBool = styled.td`
  width: 50px;
  margin: 20px;
  border: 1px solid var(--background-highlight);
  text-align: center;
  vertical-align: center;
`;
const ServiceLegend = styled.legend`
  margin-top: 30px;
  font-weight: bold;
  color: var(--fontColor-highlight);
`;

export default function CarIdServicehistory({ car, toggle }) {
  return (
    <ServiceTableSection>
      {car.serviceHistory &&
        car.serviceHistory
          .slice()
          .reverse()
          .map((service) => {
            return (
              <>
                <ServiceTableStyle key={service._id}>
                  <tbody>
                    <ServiceLegend>
                      {DateFromCreatedAtString(service.createdAt)} @{" "}
                      {service.odometerReading}km
                    </ServiceLegend>
                    <ServiceDetailBody>
                      {Object.entries(service.serviceIncluded).map(
                        ([category, keyValue]) => (
                          <section key={category}>
                            <tr>
                              <td>
                                <h5>
                                  {category === "engine"
                                    ? "Motor"
                                    : category === "electrics"
                                    ? "Elektrik"
                                    : category === "mechanical"
                                    ? "Mechanisch"
                                    : "Unbekannt"}
                                </h5>
                              </td>
                            </tr>

                            {Object.entries(keyValue).map(([key, value]) => (
                              <ServiceDiv key={key}>
                                <tr>
                                  <ServiceTableData>{key}</ServiceTableData>

                                  <ServiceTableBool>
                                    {JSON.stringify(value)}
                                  </ServiceTableBool>
                                </tr>
                              </ServiceDiv>
                            ))}
                          </section>
                        )
                      )}
                    </ServiceDetailBody>
                  </tbody>
                </ServiceTableStyle>
              </>
            );
          })}
    </ServiceTableSection>
  );
}
