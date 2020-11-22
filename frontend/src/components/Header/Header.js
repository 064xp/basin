import React from "react";
import "./header.css";
import { useSelector } from "react-redux";

const Header = (props) => {
  const username = useSelector((state) => state.user.username);

  return (
    <header>
      <div className="header_user-name">{username}</div>
      <div className="header_user-icon">
        {username ? username[0].toUpperCase() : "?"}
      </div>
    </header>
  );
};

export default Header;
