const initialState = {
  username: "",
  accessToken: "",
  loggedIn: false,
  loginError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
      };
    case "LOG_OUT":
      return {
        ...state,
        loggedIn: false,
        username: "",
        accesToken: "",
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
