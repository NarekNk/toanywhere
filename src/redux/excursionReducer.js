import excursionAPI from "../api/excursionApi";
import {
  setExcursionData,
  SET_EXCURSION_DATA,
  SET_FORBIDDEN,
  SET_IS_JOINED,
  SET_LIMIT_REACHED,
} from "./actions";
import { alreadyOk } from "./authReducer";

const initialState = {
  joined: false,
  ex_tid: 3866,

  ex_status: null,
  ex_name: null,
  ex_description: null,
  ex_time_start: null,
  ex_h_cost: null,
};

const excursionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_JOINED:
      return {
        ...state,
        isJoined: action.isJoined,
      };
    case SET_FORBIDDEN:
      return {
        ...state,
        isForbidden: action.isForbidden,
      };
    case SET_LIMIT_REACHED:
      return {
        ...state,
        isLimitReached: action.isLimitReached,
      };
    case SET_EXCURSION_DATA:
      return {
        ...state,
        ex_status: action.ex_status,
        ex_name: action.ex_name,
        ex_description: action.ex_description,
        ex_time_start: action.ex_time_start,
        ex_h_cost: action.ex_h_cost,
      };
    default:
      return state;
  }
};

export const joinMe = (uid, sid, ex_tid, navigate) => async (dispatch, getState) => {
  alreadyOk(uid, sid, ex_tid, navigate, dispatch, getState);
};


export default excursionReducer;
