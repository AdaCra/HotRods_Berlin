import Image from "next/image";
import DateFromCreatedAtString from "../TimeDateValueCalculations/DateFromCreatedAtString";
import {
  ServiceH4,
  ServiceTableSection,
  ServiceDetailBody,
  ServiceTableStyle,
  ServiceTH,
  ServiceTableData,
  ServiceTableDataYes,
  ServiceTableDataNo,
  ServiceTableBoolYes,
  ServiceTableBoolNo,
} from "./ServiceDetailsList.styled";

export default function CarIdServicehistory({ car }) {
  return (
    <>
      {car.serviceHistory &&
        car.serviceHistory
          .slice()
          .reverse()
          .map((service) => {
            return (
              <section key={service._id}>
                <ServiceH4>
                  {DateFromCreatedAtString(service.createdAt)} bei{" "}
                  {service.odometerReading}km - durchgeführten von{" "}
                  {service.mechanicName}
                </ServiceH4>
                <ServiceTableSection key={service._id}>
                  {Object.keys(service.serviceIncluded).map((serviceType) => (
                    <ServiceTableStyle key={serviceType}>
                      <thead>
                        <tr>
                          <ServiceTH colSpan={2}>
                            <h5>
                              {serviceType === "engine"
                                ? "Motor"
                                : serviceType === "electrics"
                                ? "Elektrik"
                                : serviceType === "mechanical"
                                ? "Mechanik"
                                : serviceType}
                            </h5>
                          </ServiceTH>
                        </tr>
                      </thead>
                      <ServiceDetailBody>
                        {Object.entries(
                          service.serviceIncluded[serviceType]
                        ).map(([key, value]) => (
                          <tr key={key}>
                            {value ? (
                                <>
                              <ServiceTableBoolYes>                            
                                <b>✓</b>
                              </ServiceTableBoolYes>
                              <ServiceTableDataYes>{key}</ServiceTableDataYes>
                              </>
                            ) : (
                                <>
                              <ServiceTableBoolNo>
                                <b>✕</b>
                              </ServiceTableBoolNo>
                              <ServiceTableDataNo>{key}</ServiceTableDataNo>
                              </>
                            )}
                          </tr>
                        ))}
                      </ServiceDetailBody>
                    </ServiceTableStyle>
                  ))}
                </ServiceTableSection>
              </section>
            );
          })}
    </>
  );
}
