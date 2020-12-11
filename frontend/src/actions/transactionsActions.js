import axios from "axios";

export const getTransactions = (accessToken) => (dispatch) =>
  axios
    .get("/transactions")
    .then((res) => {
      dispatch({ type: "SET_TRANSACTIONS", payload: res.data.transactions });
    })
    .catch((error) => {
      // TODO show error notification
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

export const setPendingStatus = (id, status) => (dispatch) => {
  axios
    .post("/transactions/pending", { id: id, pending: status })
    .then((res) => {
      dispatch({
        type: "SET_PENDING_STATUS",
        payload: { id: id, pending: status },
      });
      dispatch({
        type: "REFRESH_TRANSACTIONS",
      });
    })
    .catch((e) => {
      // TODO Implement notifications
    });
};

export const setPaidStatus = (id, status) => (dispatch) => {
  axios
    .post("/transactions/paid", { id: id, paid: status })
    .then((res) => {
      dispatch({
        type: "SET_PAID_STATUS",
        payload: { id: id, paid: status },
      });
      dispatch({
        type: "REFRESH_TRANSACTIONS",
      });
    })
    .catch((e) => {
      // TODO Implement notifications
    });
};

export const deleteTransaction = (id) => (dispatch) => {
  axios
    .delete(`/transactions/${id}`)
    .then((res) => {
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    })
    .catch((e) => {
      //TODO Display error message
      alert("error while deleting transaction");
    });
};

export const getEarnings = (timeframe) => (dispatch) => {
  axios
    .get(`/earnings/${timeframe}`)
    .then((res) => {
      dispatch({ type: "SET_EARNINGS", payload: res.data.earnings });
    })
    .catch((e) => {
      //TODO dispay error
    });
};
