import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createObservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ObservationForm from "./ObservationForm";

function ObservationCreate() {
  const history = useHistory();

  const [observation, setObservation] = useState({
    latitude: "",
    longitude: "",
    sky_condition: "",
    air_temperature: "",
    air_temperature_unit: "",
  });
  const [error, setError] = useState(null);

  function cancelHandler() {
    history.push("/");
  }

  function changeHandler({ target: { name, value } }) {
    setObservation((previousObservation) => ({
      ...previousObservation,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    createObservation(observation)
      .then(() => {
        history.push("/");
      })
      .catch(setError);
  }

  return (
    <main>
      <h1 className="mb-3">Create Observation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler} className="mb-4">
        <ObservationForm observation={observation} changeHandler={changeHandler} />
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default ObservationCreate;