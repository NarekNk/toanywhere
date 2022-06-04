import authAPI from "../api/authApi";
import excursionAPI from "../api/excursionApi";
import {
  setCodeError,
  setEmail,
  setEmailError,
  setExCurrent,
  setExcursionData,
  setIsJoined,
  setIsLoading,
  setIsLogging,
  setIsValidCode,
  setMessage,
  setPayPurpose,
  setStreamData,
  setUid,
  SET_CODE_ERROR,
  SET_EMAIL,
  SET_EMAIL_ERROR,
  SET_EX_CURRENT,
  SET_IS_LOADING,
  SET_IS_LOGGING,
  SET_IS_VALID_CODE,
  SET_MESSAGE,
  SET_PAY_PURPOSE,
  SET_STREAM_DATA,
  SET_UID,
} from "./actions";

const initialState = {
  isAuth: false,
  email: null,
  uid: null,
  isValidCode: false,
  codeError: null,
  emailError: null,
  isLogging: null,

  isLoading: false,

  ex_tid: 3866,

  ex_status: null,
  ex_name: null,
  ex_description: null,
  ex_time_start: null,

  ex_h_cost: null,

  ex_current: null,

  message: {
    messageText: null,
    func: null,
    backTo: null,
  },

  payPurpose: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_UID:
      return {
        ...state,
        uid: action.uid,
      };
    case SET_CODE_ERROR:
      return {
        ...state,
        codeError: action.codeError,
      };
    case SET_EMAIL_ERROR:
      return {
        ...state,
        emailError: action.emailError,
      };
    case SET_IS_VALID_CODE:
      return {
        ...state,
        isValidCode: action.isValidCode,
      };
    case SET_IS_LOGGING:
      return {
        ...state,
        isLogging: action.isLogging,
      };
    case SET_EX_CURRENT:
      return {
        ...state,
        ex_current: action.ex_current,
      };
    case SET_STREAM_DATA:
      return {
        ...state,
        ex_room_id: action.ex_room_id,
        ex_stream_id: action.ex_stream_id,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: {
          messageText: action.payload.messageText,
          func: action.payload.func,
          backTo: action.payload.backTo,
        },
      };
    case SET_PAY_PURPOSE:
      return {
        ...state,
        payPurpose: action.payPurpose,
      };
    default:
      return state;
  }
};

export const getCode = (email, navigate) => async (dispatch) => {
  await authAPI
    .getCode(email)
    .then((res) => {
      switch (res.data.status) {
        case "ok":
          dispatch(setEmail(email));
          dispatch(setIsLogging(false));
          navigate("/entercode");
          break;
        case "email exist":
          dispatch(
            setEmailError(
              "Такой пользователь существует! Перейдите на экран авторизации"
            )
          );
          break;
        default:
          dispatch(setCodeError("Что-то пошло не так. Попробуйте еще раз"));
      }
    })
    .catch((err) => {
      console.log("err");
    });
};

export const checkCode = (email, code) => async (dispatch) => {
  await authAPI
    .sendCode(email, code)
    .then((res) => {
      console.log(res);
      switch (res.data.status) {
        case "ok":
          dispatch(setUid(res.data.uid));
          dispatch(setIsValidCode(true));
          break;
        case "vcode error":
          dispatch(setCodeError("Не верный код! Попробуйте еще раз!"));
          break;
        default:
          dispatch(setCodeError("Что-то пошло не так. Попробуйте еще раз"));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// punkt 9
const alreadyOk = async (uid, sid, ex_tid, navigate, dispatch, getState) => {
  const ex_current = getState().auth.ex_current;
  dispatch(setIsJoined(true));
  await excursionAPI.getExcursion(uid, sid, ex_tid).then((result) => {
    if (result.data.status === "ok") {
      // punkt 10
      const excursions = result.data.excursions[0];
      switch (excursions.ex_status) {
        case "in_progress":
        case "grp_wait_start_by_user":
          // case "grp_accepted_by_user":
          // punkt 12
          if (excursions.ex_h_cost === 0) {
            // punkt 13
            console.log("0");
            excursionAPI
              .patchExcursionStart(uid, sid, ex_tid)
              .then((patchResponse) => {
                console.log(patchResponse);
                if (patchResponse.data.status === "ok") {
                  // punkt 13.1
                  let isStarted = false;
                  let interval = setInterval(() => {
                    if (isStarted) {
                      clearInterval(interval);
                    }
                    // console.log(1);
                    excursionAPI
                      .getExcursion(uid, sid, ex_tid)
                      .then((response) => {
                        if (response.data.status === "ok") {
                          const newExcursions = response.data.excursions[0];
                          dispatch(setExCurrent(newExcursions));
                          if (newExcursions.ex_status === "in_progress") {
                            dispatch(
                              setStreamData(
                                newExcursions.ex_room_id,
                                newExcursions.ex_stream_id
                              )
                            );
                            // start stream

                            isStarted = true;
                            navigate("/stream");
                            // punkt 15
                          }
                        }
                      });
                  }, 1000);
                } else {
                  // try again punkt 13
                }
              });
          } else {
            //punkt 14
            const pay_purpose = ex_current?.ex_fix_cost_mode_grp
              ? "fix_cost"
              : "prepay";
            dispatch(setPayPurpose(pay_purpose));

            // payment
          }
          break;
        case "grp_accepted_by_user":
          //punkt 11
          navigate("/excursion");

          dispatch(
            setExcursionData(
              excursions.ex_status,
              excursions.ex_name,
              excursions.ex_description,
              excursions.ex_time_start,
              excursions.ex_h_cost
            )
          );
          break;
        default:
          console.log(result.data.excursions.ex_status);
      }
    } else {
      let messageText = "Что-то пошло не так. Попробуйте еще раз";
      let func = () => alreadyOk(uid, sid, ex_tid, navigate, dispatch);
      dispatch(setMessage(messageText, func, "/excursion"));
    }
  });
};

export const authMe =
  (uid, sid, ex_tid, ex_current, navigate) => async (dispatch, getState) => {
    const data = await authAPI
      .authMe(uid, sid)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });

    if (data.status === "ok") {
      await excursionAPI
        .join(uid, sid, ex_tid)
        .then((res) => {
          if (res.data.status === "ok") {
            // punkt 9
            alreadyOk(uid, sid, ex_tid, navigate, dispatch, getState);
          }
        })
        .catch((err) => {
          switch (err.response.data.status) {
            case "already_join":
              // punkt 9
              alreadyOk(uid, sid, ex_tid, navigate, dispatch, getState);
              break;
            case "forbidden":
              // show error message
              dispatch(setIsLoading(true));
              console.log("forbidden");
              break;
            case "limit_reached":
              // show loading screen
              dispatch(setIsLoading(true));
              console.log("limit reached");
              break;
            default:
              console.log("default");
          }
        });
    }
  };

export const getRestoreCode = (email, navigate) => async (dispatch) => {
  await authAPI.restore(email).then((res) => {
    switch (res.data.status) {
      case "ok":
        dispatch(setEmail(email));
        dispatch(setIsLogging(true));
        navigate("/entercode");
        break;
      case "email not exist":
        dispatch(setEmailError("Пользователь не зарегистрирован!"));
        break;
      default:
        console.log(res);
        dispatch(setCodeError("Что-то пошло не так. Попробуйте еще раз"));
    }
  });
};

export const checkRestoreCode = (email, code) => async (dispatch) => {
  await authAPI.sendRestoreCode(email, code).then((res) => {
    switch (res.data.status) {
      case "ok":
        dispatch(setUid(res.data.uid));
        dispatch(setIsValidCode(true));
        break;
      case "vcode error":
        dispatch(setCodeError("Не верный код! Попробуйте еще раз!"));
        break;
      default:
        dispatch(setCodeError("Что-то пошло не так. Попробуйте еще раз"));
    }
  });
};

export default authReducer;
