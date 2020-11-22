import React from "react";
import Transaction from "./Transaction/Transaction";
import "./transactions.css";
import { useSelector } from "react-redux";

const Transactions = (props) => {
  const completed = useSelector((state) => state.transactions.completed);
  const pending = useSelector((state) => state.transactions.pending);

  const chooseBackground = (transaction) => {
    const colors = {
      pending: "#283593",
      unpaid: "#F57F17",
      completed: "#4CAF50",
    };

    if (transaction.pending) {
      return colors.pending;
    } else if (!transaction.paid) {
      return colors.unpaid;
    } else {
      return colors.completed;
    }
  };

  return (
    <section id="transactions">
      <h2 className="transactions-subtitle">Pending</h2>
      <div className="transactions-container">
        {pending.map((t, i) => {
          return (
            <Transaction
              key={i}
              transaction={t}
              background={chooseBackground(t)}
            />
          );
        })}
      </div>
      <h2 className="transactions-subtitle">Completed</h2>
      <div className="transactions-container">
        {completed.map((t, i) => {
          return (
            <Transaction
              key={i}
              transaction={t}
              background={chooseBackground(t)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Transactions;
