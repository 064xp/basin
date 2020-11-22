import React from "react";
import PropTypes from "prop-types";
import "./infoCircle.css";
import ReactFitText from "react-fittext";

const InfoCircle = (props) => {
  return (
    <div className="info-circle">
      <div className="info-circle_time-frame">this {props.timeFrame}</div>
      <h2 className="info-circle_ammount">${props.ammount}</h2>
      <div className="info-circle_pending">{props.pending} pending</div>
    </div>
  );
};

InfoCircle.propTypes = {
  ammount: PropTypes.number.isRequired,
  timeFrame: PropTypes.string.isRequired,
  pending: PropTypes.number.isRequired,
};

export default InfoCircle;
