/* eslint-disable import/no-anonymous-default-export */

import { ACCESS_TOKEN, SET_USER_ACC, SET_USER_TYPE } from "../actions/type";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: payload,
      };
    case ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };
    case SET_USER_ACC:
      return {
        ...state,
        accNo: payload,
      };
    default:
      return state;
  }
}
