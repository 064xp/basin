import axios from "axios";

export const login = (username, password) => (dispatch) =>
  axios
    .post("/auth", { username, password })
    .then((res) => {
      const accessToken = res.data.access_token;
      axios.defaults.headers.common["Authorization"] = "JWT " + accessToken;
      dispatch({ type: "AUTH_ERROR", payload: null });
      dispatch({ type: "LOG_IN", payload: { username, accessToken } });
    })
    .catch((error) => {
      dispatch({ type: "AUTH_ERROR", payload: "Invalid Credentials" });
    });

export const signup = (username, password) => (dispatch) =>
  axios
    .post("/sign-up", { username, password })
    .then((res) => {
      dispatch(login(username, password));
    })
    .catch((error) => {
      dispatch({ type: "AUTH_ERROR", payload: "Username already in use" });
    });

export const authError = (error) => {
  return { type: "AUTH_ERROR", payload: error };
};
