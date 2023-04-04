import React from "react";

function ObservationForm({ observation, changeHandler }) {
  let airTemp;
  if (observation.air_temperature_unit === "C") {
    airTemp = (
      <div className="col-6">
        <label className="form-label" htmlFor="air_temperature">
          Air Temperature
        </label>
        <input
          className="form-control"
          id="air_temperature"
          name="air_temperature"
          type="number"
          max="107"
          min="-50"
          step="0.01"
          value={observation.air_temperature}
          onChange={changeHandler}
          required={true}
        />
        <small className="form-text text-muted">
          Enter a value between -50 and 107
        </small>
      </div>
    );
  } else if (observation.air_temperature_unit === "F") {
    airTemp = (
      <div className="col-6">
        <label className="form-label" htmlFor="air_temperature">
          Air Temperature
        </label>
        <input
          className="form-control"
          id="air_temperature"
          name="air_temperature"
          type="number"
          max="224"
          min="-60"
          step="0.01"
          value={observation.air_temperature}
          onChange={changeHandler}
          required={true}
        />
        <small className="form-text text-muted">
          Enter a value between -60 and 224
        </small>
      </div>
    );
  } else {
    airTemp = (
      <div className="col-6">
        <label className="form-label" htmlFor="air_temperature">
          Air Temperature
        </label>
        <input
          className="form-control"
          id="air_temperature"
          name="air_temperature"
          type="number"
          max="224"
          min="-60"
          step="0.01"
          value={observation.air_temperature}
          onChange={changeHandler}
          required={true}
          disabled={true}
        />
        <small className="form-text text-muted">
          Select air temperature units
        </small>
      </div>
    );
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="latitude">
            Latitude
          </label>
          <input
            className="form-control"
            id="latitude"
            name="latitude"
            type="number"
            max="90"
            min="-90"
            step="0.01"
            value={observation.latitude}
            onChange={changeHandler}
            required={true}
          />
          <small className="form-text text-muted">
            Enter a value between -90 and 90
          </small>
        </div>
        <div className="col-6">
          <label className="form-label" htmlFor="longitude">
            Longitude
          </label>
          <input
            className="form-control"
            id="longitude"
            name="longitude"
            type="number"
            max="180"
            min="-180"
            step="0.01"
            value={observation.longitude}
            onChange={changeHandler}
            required={true}
          />
          <small className="form-text text-muted">
            Enter a value between -180 and 180
          </small>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="air_temperature_unit">
            Air Temperature Units
          </label>
          <select
            className="form-control"
            id="air_temperature_unit"
            name="air_temperature_unit"
            value={observation.air_temperature_unit}
            onChange={changeHandler}
            required={true}
          >
            <option value="">Select air temperature units</option>
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
          </select>
        </div>
        {airTemp}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cloudCover">
          Sky Conditions
        </label>
        <select
          className="form-control"
          id="sky_condition"
          name="sky_condition"
          value={observation.sky_condition}
          onChange={changeHandler}
          required={true}
        >
          <option value="">Select a sky condition option</option>
          <option value="100">Cloudless</option>
          <option value="101">Some clouds</option>
          <option value="102">Cloud covered</option>
          <option value="103">Foggy</option>
          <option value="104">Raining</option>
          <option value="106">Snowing</option>
          <option value="108">Hailing</option>
          <option value="109">Thunderstorms</option>
        </select>
      </div>
    </>
  );
}

export default ObservationForm;
