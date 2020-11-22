import React from "react";
import PropTypes from "prop-types";
import "./transaction.css";

const Transaction = ({ transaction }) => {
  return (
    <div className="transaction">
      <div>
        <h3 className="transaction_name margin0">
          {transaction.name} ({transaction.ammount})
        </h3>
        <p className="transaction_client margin0">{transaction.client}</p>
      </div>
      <div className="transaction_right">
        <p className="transaction_cost">${transaction.cost}</p>
        {!transaction.paid ? <p className="transaction_paid">Unpaid</p> : null}
      </div>
    </div>
  );
};

export default Transaction;
