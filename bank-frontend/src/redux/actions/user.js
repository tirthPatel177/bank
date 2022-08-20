import { ACCESS_TOKEN, SET_USER_ACC, SET_USER_TYPE } from "./type";

export const setUserType = (value, dispatch) => {
  dispatch({
    type: SET_USER_TYPE,
    payload: value,
  });
};

export const setAccessToken = (value, dispatch) => {
  dispatch({
    type: ACCESS_TOKEN,
    payload: value,
  });
};

export const setAccNo = (value, dispatch) => {
  dispatch({
    type: SET_USER_ACC,
    payload: value,
  });
};
