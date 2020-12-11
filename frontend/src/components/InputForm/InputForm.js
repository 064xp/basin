import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./inputForm.css";
import { addTransaction } from "../../actions/transactionsActions";

import Transaction from "../Transactions/Transaction/Transaction";
import dollarIcon from "../../img/dollar-dark.svg";
import crossIcon from "../../img/cross-sign.svg";
import plus from "../../img/plus.svg";

const InputForm = (props) => {
  const dispatch = useDispatch();
  const formEl = useRef(null);
  const [state, setState] = useState({
    name: "",
    ammount: 1,
    individualPrice: "0",
    cost: "0",
    client: "",
    paid: false,
    pending: true,
  });

  const onChange = (e) => {
    const field = e.target.name;
    setState({
      ...state,
      [field]: e.target.value,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      cost: (Number(state.individualPrice) * Number(state.ammount)).toString(),
    });
  }, [state.ammount, state.individualPrice]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addTransaction(state));
    setState({
      name: "",
      ammount: 1,
      individualPrice: "0",
      cost: "0",
      client: "",
      paid: false,
      pending: true,
    });
    toggleForm();
  };

  const toggleForm = () => {
    formEl.current.classList.toggle("transaction-inputForm_show");
  };

  return (
    <React.Fragment>
      <button
        className="transaction-inputForm_btn-open"
        onClick={toggleForm}
        style={{ backgroundImage: `url(${plus})` }}
      ></button>
      <form
        action="#"
        ref={formEl}
        className={"transaction-inputForm"}
        onSubmit={onSubmit}
      >
        <h1>Add a new Transaction</h1>
        <Transaction transaction={state} />
        <button
          className="transaction-inputForm_close"
          type="button"
          style={{ backgroundImage: `url(${crossIcon})` }}
          onClick={toggleForm}
        ></button>
        <div className="transaction-inputForm_inputs">
          <label htmlFor="input-form_tName">Name</label>
          <input
            type="text"
            id="input-form_tName"
            name="name"
            onChange={onChange}
            value={state.name}
          />
          <label htmlFor="input-form_client">Client</label>
          <input
            type="text"
            id="input-form_tName"
            name="client"
            onChange={onChange}
            value={state.client}
          />
          <label htmlFor="input-form_ammount">Ammount</label>
          <input
            type="number"
            id="input-form_ammount"
            name="ammount"
            onChange={onChange}
            value={state.ammount}
            inputMode="numeric"
          />
          <label htmlFor="input-form_price">Individual Price</label>
          <input
            type="number"
            id="input-form_price"
            name="individualPrice"
            onChange={onChange}
            value={state.individualPrice.toString()}
            inputMode="numeric"
            style={{
              backgroundImage: `url(${dollarIcon})`,
            }}
            onFocus={(e) => e.target.select()}
            className="transaction-inputForm_icon-input"
          />
        </div>

        <button className="transaction-inputForm-submit" type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default InputForm;
