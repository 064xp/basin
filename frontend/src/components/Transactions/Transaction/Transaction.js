import React from "react";
import PropTypes from "prop-types";
import "./transaction.css";

const Transaction = ({ transaction, background = "#283593" }) => {
  return (
    <div className="transaction" style={{ background: background }}>
      <div>
        <h3 className="transaction_name margin0">
          {transaction.name} ({transaction.ammount})
        </h3>
        <p className="transaction_client margin0">{transaction.client}</p>
      </div>
      <div className="transaction_right">
        {transaction.individualPrice ? (
          <p className="transaction_indiv-price">
            Individual Price <span>${transaction.individualPrice}</span>
          </p>
        ) : null}
        <p className="transaction_cost">${transaction.cost}</p>
        {!transaction.paid ? <p className="transaction_paid">Unpaid</p> : null}
      </div>
    </div>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  background: PropTypes.string.isRequired,
};

export default Transaction;
