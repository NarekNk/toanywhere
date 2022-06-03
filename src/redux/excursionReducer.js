import excursionAPI from "../api/excursionApi";

const SET_IS_JOINED = "SET_IS_JOINED";
const SET_FORBIDDEN = "SET_FORBIDDEN";
const SET_LIMIT_REACHED = "SET_LIMIT_REACHED";

const SET_EXCURSION_DATA = "SET_EXCURSION_DATA";

const initialState = {
  joined: false,
  ex_tid: 3866,

  ex_status: null,
  ex_name: null,
  ex_description: null,
  ex_start_time: null,
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
        ex_start_time: action.ex_start_time,
        ex_h_cost: action.ex_h_cost,
      };
    default:
      return state;
  }
};

export const setIsJoined = (isJoined) => ({ type: SET_IS_JOINED, isJoined });
export const setExcursionData = (
  ex_status,
  ex_name,
  ex_description,
  ex_start_time,
  ex_h_cost
) => ({
  type: SET_EXCURSION_DATA,
  ex_status,
  ex_name,
  ex_description,
  ex_start_time,
  ex_h_cost,
});

export const joinMe = (uid, sid, ex_tid) => async (dispatch) => {
  await excursionAPI.getExcursion(uid, sid, ex_tid).then((result) => {
    if (result.data.status === "ok") {
      const excursions = result.data.excursions[0];
      switch (excursions.ex_status) {
        case "in_progress":
        case "grp_wait_start_by_user":
          // punkt 12
          console.log("qaq");
          if (excursions.ex_h_cost === 0) {
            // punkt 13
            excursionAPI
              .patchExcursionStart(uid, sid, ex_tid)
              .then((patchResponse) => {
                console.log(patchResponse);
                if (patchResponse.data.status === "ok") {
                  // punkt 13.1
                  setInterval(() => console.log(1));
                } else {
                  // try again punkt 13
                }
              });
          } else {
            console.log("pox chka");
            //punkt 14
          }
          break;
        case "grp_accepted_by_user":
          //punkt 11
          dispatch(
            setExcursionData(
              excursions.ex_status,
              excursions.ex_name,
              excursions.ex_description,
              excursions.ex_start_time,
              excursions.ex_h_cost
            )
          );
          break;
        default:
          console.log(result.data.excursions.ex_status);
      }
    }
  });
};

export const getExcursion = (uid, sid, ex_tid) => async (dispatch) => {
  await excursionAPI.getExcursion(uid, sid, ex_tid).then((res) => {
    // console.log(res.data.excursions);
  });
};

export default excursionReducer;
