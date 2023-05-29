import DateFromCreatedAtString from "../TimeDateValueCalculations/DateFromCreatedAtString";

export default function CarIdDamageReports({ dataSet, resolvedFilter, title }) {
  const filteredData =
    dataSet.damageReports &&
    dataSet.damageReports
      .slice()
      .reverse()
      .filter((report) =>
        resolvedFilter ? report.isResolved : !report.isResolved
      ).length;
 console.log(filteredData)
  return (
    <>
      {dataSet.damageReports &&
        dataSet.damageReports
          .slice()
          .reverse()
          .filter((report) =>
            resolvedFilter ? report.isResolved : !report.isResolved
          )
          .map((report) => {
            console.log(report);
            if (filteredData === 0) {
              return `Es gibt keine ${title} Berichte`;
            } else if (filteredData > 0) {
              return (
                <section key={report._id}>
                  <h4>
                    {report.type === "mechanical"
                      ? "Mechanische"
                      : report.type === "body"
                      ? "Karosserie"
                      : report.type === "electrical"
                      ? "Electrische"
                      : "unbekannte"}
                    schäden - {DateFromCreatedAtString(report.createdAt)}
                  </h4>
                  <section>
                    <table>
                      <tbody>
                        <tr>
                          <td>Auto noch fahrbar</td>
                          <td>{report.isDrivable ? "Ja" : "Nein"}</td>
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
                  </section>
                </section>
              );
            }
          })}
    </>
  );
}
