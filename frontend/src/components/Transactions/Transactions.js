import React from "react";
import PropTypes from "prop-types";
import Transaction from "./Transaction/Transaction";
import "./transactions.css";

const Transactions = (props) => {
  //mock data
  const pending = [
    {
      name: "Sale 1",
      client: "John",
      ammount: 3,
      cost: 300,
      paid: false,
      pending: true,
    },
    {
      name: "Sale 2",
      client: "Peter",
      ammount: 2,
      cost: 200,
      paid: false,
      pending: false,
    },
  ];
  const completed = [
    {
      name: "Sale 3",
      client: "Mary",
      ammount: 1,
      cost: 200,
      paid: true,
      pending: false,
    },
    {
      name: "Sale 4",
      client: "Peter",
      ammount: 2,
      cost: 240,
      paid: true,
      pending: false,
    },
  ];

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
        {pending.map((t) => {
          return (
            <Transaction transaction={t} background={chooseBackground(t)} />
          );
        })}
      </div>
      <h2 className="transactions-subtitle">Completed</h2>
      <div className="transactions-container">
        {completed.map((t) => {
          return (
            <Transaction transaction={t} background={chooseBackground(t)} />
          );
        })}
      </div>
    </section>
  );
};

export default Transactions;
