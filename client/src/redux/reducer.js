import {
  ACCOUNT_SETUP,
  LOGOUT,
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
} from "./action";

let initialData = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  token: JSON.parse(localStorage.getItem("token")) || "",
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
    case ADD_TASK: {
      state = {
        ...state,
      };
    }
    case EDIT_TASK: {
      return {
        ...state,
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
