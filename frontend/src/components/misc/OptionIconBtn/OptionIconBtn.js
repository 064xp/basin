import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./option-btn.css";

const OptionIconBtn = ({
  icon,
  active = true,
  activeColor = "#3b3b3b",
  inactiveColor = "",
  hoverColor = "",
  customClass,
  onClickFunc,
}) => {
  const buttonRef = useRef(null);
  return (
    <div className={`option-button_cont ${customClass}`}>
      <button
        className="option-button_btn"
        ref={buttonRef}
        style={{
          backgroundImage: `url('${icon}')`,
          backgroundColor: active ? activeColor : inactiveColor,
        }}
        onClick={onClickFunc}
        onMouseEnter={(e) =>
          (buttonRef.current.style.backgroundColor = hoverColor)
        }
        onMouseLeave={(e) =>
          (buttonRef.current.style.backgroundColor = active
            ? activeColor
            : inactiveColor)
        }
      ></button>
    </div>
  );
};

export default OptionIconBtn;
