import React, { useState } from "react";
import PropTypes from "prop-types";
import "./overlayOptions.css";
import OptionIconBtn from "../../misc/OptionIconBtn/OptionIconBtn";

import CheckIcon from "../../../img/check-solid.svg";
import DollarIcon from "../../../img/dollar.svg";
import TrashIcon from "../../../img/trash-solid.svg";
import BackIcon from "../../../img/chevron-left-solid.svg";

const OverlayOptions = ({ showOptions, hide }) => {
  return (
    <div
      className={`transaction_overlay-options ${
        showOptions ? "transaction_overlay-options_show" : ""
      }`}
    >
      <OptionIconBtn
        icon={TrashIcon}
        activeColor={"#F44336"}
        hoverColor={"#b11408"}
        customClass={"overlay-option_btn"}
      />
      <OptionIconBtn icon={CheckIcon} customClass={"overlay-option_btn"} />
      <OptionIconBtn icon={DollarIcon} customClass={"overlay-option_btn"} />
      <OptionIconBtn
        icon={BackIcon}
        customClass={"overlay-option_btn"}
        onClickFunc={hide}
      />
    </div>
  );
};

export default OverlayOptions;
