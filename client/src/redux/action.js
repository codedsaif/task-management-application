export const ACCOUNT_SETUP = "ACCOUNT_SETUP";
export const LOGOUT = "LOGOUT";
export const TASKS = "TASKS";

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
export const tasksAction = (value, dispatch) => {
  dispatch({
    type: TASKS,
    payload: value || [],
  });
};
