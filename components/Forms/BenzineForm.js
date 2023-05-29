import { useRouter } from "next/router";
import TimeDifference from "../TimeDateValueCalculations/TimeDifference";

export default function BenzineForm({ latestEntry, handleSubmit }) {
  const router = useRouter();

  const redirectToHomePage = () => {
    router.push("/");
  };

  const lastCount = latestEntry?.count;
  const createAtTimestamp = new Date(latestEntry?.createdAt);
  const formattedDate = createAtTimestamp.toLocaleDateString("en-GB");
  const formattedTime = createAtTimestamp.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const hoursSinceLastUpdate = TimeDifference(createAtTimestamp);

  return (
    <section>
      <h2 id="update-benzine">Benzinestände</h2>
      <h3>
        Letzte Aktualisierung:{" "}
        <b>
          {formattedTime === "Invalid Date" ? "Loading" : formattedTime},{" "}
          {formattedDate === "Invalid Date" ? "Loading" : formattedDate}
        </b>
        <br />
        Letzte Zahl: <b>{lastCount ? lastCount : "Loading"}</b> Benzinkanister
      </h3>

      <p>
        <em>
          {Math.floor(hoursSinceLastUpdate)} stunden seit der letzten
          Aktualisieren
        </em>
      </p>
      {hoursSinceLastUpdate > 12 ? (
        <form onSubmit={handleSubmit} formName="update-benzine">
          <label>
            Aktualisieren:
            <input
              type="number"
              name="count"
              id="benzineCount"
              placeholder="##"
              min={0}
            ></input>
            <button type="submit">Absenden</button>
          </label>
        </form>
      ) : (
        <>
          <p onClick={redirectToHomePage}>Die Zählung ist aktuell</p>
        </>
      )}
    </section>
  );
}
