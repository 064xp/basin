const initialState = {
  username: "",
  isLoggedIn: false,
};

export default reducer = (state = initialState, action) => {
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
  }
};
