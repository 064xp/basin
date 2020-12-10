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
    case "SET_PENDING_STATUS":
      return {
        ...state,
        pending: state.pending.map((t) =>
          t.id === action.payload.id
            ? { ...t, pending: action.payload.pending }
            : t
        ),
        completed: state.completed.map((t) =>
          t.id === action.payload.id
            ? { ...t, pending: action.payload.pending }
            : t
        ),
      };
    case "SET_PAID_STATUS":
      return {
        ...state,
        pending: state.pending.map((t) =>
          t.id === action.payload.id ? { ...t, paid: action.payload.paid } : t
        ),
        completed: state.completed.map((t) =>
          t.id === action.payload.id ? { ...t, paid: action.payload.paid } : t
        ),
      };

    case "REFRESH_TRANSACTIONS":
      const transactions = [...state.completed, ...state.pending];
      return {
        ...state,
        pending: transactions.filter((t) => t.pending || !t.paid),
        completed: transactions.filter((t) => !t.pending && t.paid),
      };
    default:
      return state;

    case "DELETE_TRANSACTION":
      return {
        ...state,
        pending: state.pending.filter((t) => t.id !== action.payload.id),
        completed: state.completed.filter((t) => t.id !== action.payload.id),
      };
  }
};

export default reducer;
