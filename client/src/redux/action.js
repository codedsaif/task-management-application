import { v4 as uuid } from "uuid";

export const ADD_USER = "ADD USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export const addUserAction = (value, dispatch) => {
  dispatch({
    type: ADD_USER,
    payload: {
      ...value,
      id: uuid(),
    },
  });
};
export const editUserAction = (value, dispatch) => {
  dispatch({
    type: EDIT_USER,
    payload: value,
  });
};
export const deleteUserAction = (id, dispatch) => {
  dispatch({
    type: DELETE_USER,
    payload: id,
  });
};
