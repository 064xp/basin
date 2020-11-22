import axios from "axios";

export const login = (username, password) => (dispatch) =>
  axios
    .post("/auth", { username, password })
    .then((res) => {
      const accessToken = res.data.access_token;
      axios.defaults.headers.common["Authorization"] = "JWT " + accessToken;
      dispatch({ type: "LOGIN_ERROR", payload: false });
      dispatch({ type: "LOG_IN", payload: { username, accessToken } });
    })
    .catch((error) => {
      dispatch({ type: "LOGIN_ERROR", payload: true });
    });
