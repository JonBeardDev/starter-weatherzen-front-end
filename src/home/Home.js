import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listObservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Home() {
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    listObservations(abortController.signal)
      .then(setObservations)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  const tableRows = observations.map((observation) => {
    let degCelsius = 0;
    let degFahrenheit = 0;

    if (observation.air_temperature_unit === "C") {
      degCelsius = Number(observation.air_temperature);
      degFahrenheit = (degCelsius * 9) / 5 + 32;
    } else {
      degFahrenheit = Number(observation.air_temperature);
      degCelsius = ((degFahrenheit - 32) * 5) / 9;
    }

    const tempRow = (
      <td>
        {degCelsius.toFixed(0)} &deg;C / {degFahrenheit.toFixed(0)} &deg;F
      </td>
    );

    return (
      <tr key={observation.observation_id}>
        <th scope="row">{observation.observation_id}</th>
        <td>{observation.latitude}</td>
        <td>{observation.longitude}</td>
        <td>{observation.sky_condition}</td>
        {tempRow}
        <td>{observation.created_at}</td>
        <td>
          <Link to={`observations/${observation.observation_id}/edit`}>
            <button className="btn btn-sm btn-secondary">&#9998;</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <main>
      <h1>Home</h1>
      <ErrorAlert error={error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Sky Conditions</th>
            <th scope="col">Air Temperature</th>
            <th scope="col">Created</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </main>
  );
}

export default Home;
