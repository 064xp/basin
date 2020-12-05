const initialState = {
  pending: [],
  completed: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return {
        ...state,
        pending: action.payload.filter((t) => t.pending || !t.paid),
        completed: action.payload.filter((t) => !t.pending && t.paid),
      };
    case "COMPLETED_TRANSACTION":
      return {
        ...state,
        pending: state.pending.filter((t) => t.id !== action.payload),
        completed: [
          ...state.completed,
          state.pending.find((t) => t.id === action.payload),
        ],
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        pending: [action.payload, ...state.pending],
      };
    default:
      return state;
  }
};

export default reducer;
