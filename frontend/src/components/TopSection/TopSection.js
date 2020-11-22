import React from "react";
import InfoCircle from "./InfoCircle";
import "./topSection.css";

const TopSection = (props) => {
  return (
    <section id="top-section">
      <h1 className="top-section_busines-name">Business1</h1>
      <InfoCircle ammount={2000} timeFrame={"week"} pending={2} />
    </section>
  );
};

export default TopSection;
