export const ACCOUNT_SETUP = "ACCOUNT_SETUP";
export const LOGOUT = "LOGOUT";

export const ADD_TASK = "ADD TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const accountSetup = (value, dispatch) => {
  dispatch({
    type: ACCOUNT_SETUP,
    payload: {
      ...value,
    },
  });
};
export const logout = (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const addTaskAction = (value, dispatch) => {
  dispatch({
    type: ADD_TASK,
    payload: {
      ...value,
    },
  });
};
export const editTaskAction = (value, dispatch) => {
  dispatch({
    type: EDIT_TASK,
    payload: value,
  });
};
export const deleteTaskAction = (id, dispatch) => {
  dispatch({
    type: DELETE_TASK,
    payload: id,
  });
};
