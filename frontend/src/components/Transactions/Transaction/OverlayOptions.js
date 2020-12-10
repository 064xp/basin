import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./overlayOptions.css";
import OptionIconBtn from "../../misc/OptionIconBtn/OptionIconBtn";

import {
  setPendingStatus,
  setPaidStatus,
  deleteTransaction,
} from "../../../actions/transactionsActions";

import CheckIcon from "../../../img/check-solid.svg";
import DollarIcon from "../../../img/dollar.svg";
import TrashIcon from "../../../img/trash-solid.svg";
import BackIcon from "../../../img/chevron-left-solid.svg";

const OverlayOptions = ({ showOptions, hide, transaction = {} }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    pending: transaction.pending,
    paid: transaction.paid,
  });
  const [prevState, setPrevState] = useState({ ...state });

  const commitChanges = () => {
    if (state.pending !== prevState.pending) {
      dispatch(setPendingStatus(transaction.id, state.pending));
    }
    if (state.paid !== prevState.paid) {
      dispatch(setPaidStatus(transaction.id, state.paid));
    }
    setPrevState(state);
  };

  const deleter = () => {
    hide();
    dispatch(deleteTransaction(transaction.id));
  };

  useEffect(() => {
    setState({
      pending: transaction.pending,
      paid: transaction.paid,
    });
  }, [transaction]);

  useEffect(() => {
    if (!showOptions) {
      commitChanges();
    }
    setPrevState({
      pending: state.pending,
      paid: state.paid,
    });
    // eslint-disable-next-line
  }, [showOptions]);

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
        onClickFunc={deleter}
      />
      <OptionIconBtn
        icon={CheckIcon}
        customClass={"overlay-option_btn"}
        activeColor={"#1B5E20"}
        hoverColor={"#09340d"}
        active={!state.pending}
        onClickFunc={() => setState({ ...state, pending: !state.pending })}
      />
      <OptionIconBtn
        icon={DollarIcon}
        customClass={"overlay-option_btn"}
        activeColor={"#1B5E20"}
        hoverColor={"#09340d"}
        active={state.paid}
        onClickFunc={() => setState({ ...state, paid: !state.paid })}
      />
      <OptionIconBtn
        icon={BackIcon}
        customClass={"overlay-option_btn"}
        onClickFunc={hide}
      />
    </div>
  );
};

export default OverlayOptions;

OverlayOptions.propTypes = {
  showOptions: PropTypes.bool,
  hide: PropTypes.func,
  transaction: PropTypes.object.isRequired,
};
