import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./inputForm.css";
import dollarIcon from "../../img/dollar.svg";
import crossIcon from "../../img/cross-sign.svg";

const InputForm = (props) => {
  const formEl = useRef(null);
  const [state, setState] = useState({
    name: "",
    ammount: 1,
    price: "0",
    client: "",
  });

  const onChange = (e) => {
    const field = e.target.name;
    setState({
      ...state,
      [field]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const toggleForm = () => {
    formEl.current.classList.toggle("transaction-inputForm_show");
  };
  return (
    <React.Fragment>
      <button onClick={toggleForm}>show</button>
      <form action="#" ref={formEl} className={"transaction-inputForm"}>
        <h1>Add a new Transaction</h1>
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
            name="name"
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
            inputmode="numeric"
          />
          <label htmlFor="input-form_price">Price</label>
          <input
            type="number"
            id="input-form_price"
            name="price"
            onChange={onChange}
            value={state.price}
            inputmode="numeric"
            style={{
              backgroundImage: `url(${dollarIcon})`,
            }}
            className="transaction-inputForm_icon-input"
          />
        </div>

        <button
          className="transaction-inputForm-submit"
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default InputForm;
