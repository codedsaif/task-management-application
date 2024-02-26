import { ACCOUNT_SETUP, LOGOUT, TASKS } from "./action";
import { io } from "socket.io-client";

let initialData = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: JSON.parse(localStorage.getItem("token")) || "",
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  socket: io(`${process.env.REACT_APP_API_BASE_URL}`),
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
