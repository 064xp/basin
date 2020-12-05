import axios from "axios";

export const getTransactions = (accessToken) => (dispatch) =>
  axios
    .get("/transactions")
    .then((res) => {
      dispatch({ type: "SET_TRANSACTIONS", payload: res.data.transactions });
    })
    .catch((error) => {
      dispatch({ type: "LOGIN_ERROR", payload: true });
    });

export const addTransaction = (transaction) => (dispatch) => {
  axios
    .post("/transactions", transaction)
    .then((res) => {
      transaction = { ...transaction, id: res.data.id };
      dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    })
    .catch((e) => {
      //TODO implement notifications
      // alert("Error while adding transaction");
    });
};
