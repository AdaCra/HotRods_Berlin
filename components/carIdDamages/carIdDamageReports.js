import SectionDivider from "../GeneralComponents/HorizontalRule/HrSectionSpacer";
import DateFromCreatedAtString from "../GeneralComponents/TimeDateValueCalculations/DateFromCreatedAtString";

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
                        <tr>
                          <td>Auto noch fahrbar</td>
                          <td>{report.isAffectsDriving ? "Jain " : report.isDrivable ? "Nein" : "Ja"}</td>
                        </tr>
                        <tr>
                          <td>Bericht von</td>
                          <td>{report.reporterName}</td>
                        </tr>
                        <tr>
                          <td>Schadensbeschreibung</td>
                          <td>{report.description}</td>
                        </tr>
                      </tbody>
                    </table>
                    <SectionDivider/>
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
