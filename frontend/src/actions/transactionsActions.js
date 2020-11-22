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
