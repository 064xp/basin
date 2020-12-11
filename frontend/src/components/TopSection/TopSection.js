import React, { useState, useEffect } from "react";
import InfoCircle from "./InfoCircle";
import PropTypes from "prop-types";
import "./topSection.css";
import { useSelector, useDispatch } from "react-redux";
import { getEarnings } from "../../actions/transactionsActions";

const TopSection = (props) => {
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.transactions.pending).length;
  const earnings = useSelector((state) => state.transactions.earnings);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [timeFrame, setTimeFrame] = useState("week");

  useEffect(() => {
    if (loggedIn) {
      dispatch(getEarnings(timeFrame));
    }
  }, [loggedIn]);
  return (
    <section id="top-section">
      <h1 className="top-section_busines-name">My Business</h1>
      <InfoCircle ammount={earnings} timeFrame={"week"} pending={pending} />
    </section>
  );
};

TopSection.propTypes = {
  ammountPending: PropTypes.number,
};

export default TopSection;
