import { useRouter } from "next/router";

export default function BenzineForm({
  onSubmit,
  formName,
  createAtTimestamp,
  hoursSinceLastUpdate,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  const router = useRouter();

  const redirectToHomePage = () => {
    router.push("/");
  };

  const currentTimeStamp = new Date();
  const timeDifference =
    currentTimeStamp.getTime() - createAtTimestamp.getTime();
  hoursSinceLastUpdate = timeDifference / (1000 * 60 * 60);

  if (hoursSinceLastUpdate > 12) {
    return (
      <>
        <p>
          <em>
            {Math.floor(hoursSinceLastUpdate)} stunden seit der letzten
            Aktualisieren
          </em>
        </p>
        <form onSubmit={handleSubmit} formName={formName} disabled>
          <label>
            Aktualisieren:
            <input
              type="number"
              name="count"
              id="benzineCount"
              placeholder="##"
            ></input>
            <button type="submit">Absenden</button>
          </label>
        </form>
      </>
    );
  } else {
    return (
      <>
        <p>
          <em>
            {Math.floor(hoursSinceLastUpdate)} stunden seit der letzten
            Aktualisieren
          </em>
        </p>
        <button onClick={redirectToHomePage}>Die Zählung ist aktuell</button>
      </>
    );
  }
}
