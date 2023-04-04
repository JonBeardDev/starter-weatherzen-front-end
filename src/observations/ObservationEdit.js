import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readObservation, updateObservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ObservationForm from "./ObservationForm";

function ObservationEdit() {
  const [observation, setObservation] = useState({
    observation_id: "",
    latitude: "",
    longitude: "",
    sky_condition: "",
    air_temperature: "",
    air_temperature_unit: "",
  });
  const [error, setError] = useState(null);

  const history = useHistory();
  const { observationId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readObservation(observationId, abortController.signal).then(setObservation);

    return () => abortController.abort();
  }, [observationId]);

  function cancelHandler() {
    history.push("/");
  }

  function changeHandler({ target: { name, value } }) {
    setObservation((previousObservation) => ({
      ...previousObservation,
      [name]: value,
    }));
    console.log(observation);
  }

  function submitHandler(event) {
    event.preventDefault();
    updateObservation(observation)
      .then(() => {
        history.push("/");
      })
      .catch(setError);
  }

  if (observation.observation_id) {
    return (
      <main>
        <h1 className="mb-3">Edit Observation {observation.observation_id}</h1>
        <ErrorAlert error={error} />
        <form onSubmit={submitHandler} className="mb-4">
          <ObservationForm
            observation={observation}
            changeHandler={changeHandler}
          />
          <div>
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </main>
    );
  }
  return "Loading...";
}

export default ObservationEdit;
