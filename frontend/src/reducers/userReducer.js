const initialState = {
  username: "",
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
        username: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        loggedIn: false,
        username: "",
      };
    default:
      return state;
  }
};

export default reducer;
