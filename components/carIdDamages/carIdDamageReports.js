import styled from "styled-components";
import SectionDivider from "../GeneralComponents/HorizontalRule/HrSectionSpacer";
import TableRow from "../GeneralComponents/TableRow/TableRow";
import DateFromCreatedAtString from "../GeneralComponents/TimeDateValueCalculations/DateFromCreatedAtString";

const breakingDamage = styled.table`
border-color: red`
const partialDamage = styled.table`
border-color: yellow`
const noDamage = styled.table`
border-color: green`

export default function CarIdDamageReports({ dataSet, resolvedFilter, title }) {
  
  const filteredData =
    dataSet.damageReports &&
    dataSet.damageReports
      .slice()
      .reverse()
      .filter((report) =>
        resolvedFilter ? report.isResolved : !report.isResolved
      ).length;
  return (
    <>
      {filteredData > 0 ? (
        dataSet.damageReports
          .slice()
          .reverse()
          .filter((report) =>
            resolvedFilter ? report.isResolved : !report.isResolved
          )
          .map((report, index) => {
            if (filteredData.length === 0) {
              return `Es gibt keine ${title} Berichte`;
            } else if (filteredData > 0) {
              return (
                <section key={report._id}>
                  <h4>
                    {report.type}
                    schäden - {DateFromCreatedAtString(report.createdAt)}
                  </h4>
                  <section>
                    <table>
                      <tbody>
                        <TableRow
                          keyName={"Dieser Schaden macht das Auto kaputt"}
                          keyValue={!report.isDrivable ? "Nein" : "Ja"}
                        />
                        <TableRow
                          keyName={
                            "Dieser Schaden macht das Auto unzuverlässig"
                          }
                          keyValue={!report.isDrivable ? "Nein" : "Ja"}
                        />
                        <TableRow
                          keyName={"Bericht von"}
                          keyValue={report.reporterName}
                        />
                        <TableRow
                          keyName={"Schadensbeschreibung"}
                          keyValue={report.description}
                        />
                      </tbody>
                    </table>
                    <SectionDivider />
                  </section>
                </section>
              );
            }
          })
      ) : (
        <p>Es gibt keine Schadens</p>
      )}
    </>
  );
}
{
  /* <TableRow
              keyName={""}
              keyValue={""}
            />   */
}
