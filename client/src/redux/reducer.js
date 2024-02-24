import { ADD_USER, DELETE_USER, EDIT_USER } from "./action";

let initialData = {
  users: JSON.parse(localStorage.getItem("users")) || [],
};

const reducer = (state = initialData, action) => {
  switch (action.type) {
    case ADD_USER: {
      state = {
        ...state,
        users: [...state.users, action.payload],
      };
      localStorage.setItem("users", JSON.stringify(state.users));
      return state;
    }
    case EDIT_USER: {
      if (state.users && state.users.length > 0) {
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id) {
            user.name = action.payload.name;
            user.email = action.payload.email;
            user.phone = action.payload.phone;
          }
          return user;
        });
        localStorage.setItem("users", JSON.stringify(state.users));
        return state;
      }
      break;
    }
    case DELETE_USER: {
      let updatedUsers = state.users.filter((user) => {
        return user.id !== action.payload;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
