import React, { useState } from "react";
import PropTypes from "prop-types";
import "./infoCircle.css";

const InfoCircle = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const updateTimeFrame = (e) => {
    const timeFrame = e.target.name;
    props.setTimeFrame(timeFrame);
    setShowOptions(false);
  };

  return (
    <div className="info-circle-container">
      <div className="info-circle" onClick={() => setShowOptions(!showOptions)}>
        <div className="info-circle_time-frame">this {props.timeFrame}</div>
        <h2 className="info-circle_ammount">${props.ammount}</h2>
        <div className="info-circle_pending">{props.pending} pending</div>
      </div>

      <div
        className={`info-circle_choose-timeframe ${
          showOptions ? "info-circle-choose-timeFrame_show" : ""
        }`}
      >
        <button
          className={`info-circle_timeframe-option ${
            props.timeFrame === "day"
              ? "info-circle_timeframe-option_active"
              : ""
          }`}
          name="day"
          onClick={updateTimeFrame}
        >
          Day
        </button>
        <button
          className={`info-circle_timeframe-option ${
            props.timeFrame === "week"
              ? "info-circle_timeframe-option_active"
              : ""
          }`}
          name="week"
          onClick={updateTimeFrame}
        >
          Week
        </button>
        <button
          className={`info-circle_timeframe-option ${
            props.timeFrame === "month"
              ? "info-circle_timeframe-option_active"
              : ""
          }`}
          name="month"
          onClick={updateTimeFrame}
        >
          Month
        </button>
      </div>
    </div>
  );
};

InfoCircle.propTypes = {
  ammount: PropTypes.number.isRequired,
  timeFrame: PropTypes.string.isRequired,
  pending: PropTypes.number.isRequired,
  setTimeFrame: PropTypes.func,
};

export default InfoCircle;
