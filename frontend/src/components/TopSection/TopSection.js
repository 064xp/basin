import React from "react";
import InfoCircle from "./InfoCircle";
import PropTypes from "prop-types";
import "./topSection.css";
import { useSelector } from "react-redux";

const TopSection = (props) => {
  const pending = useSelector((state) => state.transactions.pending).length;
  return (
    <section id="top-section">
      <h1 className="top-section_busines-name">My Business</h1>
      <InfoCircle ammount={2000} timeFrame={"week"} pending={pending} />
    </section>
  );
};

TopSection.propTypes = {
  ammountPending: PropTypes.number,
};

export default TopSection;
