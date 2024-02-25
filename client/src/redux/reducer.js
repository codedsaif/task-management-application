import { ACCOUNT_SETUP, LOGOUT, TASKS } from "./action";

let initialData = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: JSON.parse(localStorage.getItem("token")) || "",
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const reducer = (state = initialData, action) => {
  switch (action.type) {
    case ACCOUNT_SETUP: {
      const { user, token } = action.payload;
      return {
        ...state,
        user: user,
        token: token,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: {},
        token: "",
      };
    }
    case TASKS: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
