const initialState = {
  username: "",
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
      };
    default:
      return state;
  }
};

export default reducer;
