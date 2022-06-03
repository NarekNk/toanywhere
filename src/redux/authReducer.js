import authAPI from "../api/authApi";
import excursionAPI from "../api/excursionApi";

const SET_EMAIL = "SET_EMAIL";
const SET_UID = "SET_UID";
const SET_CODE_ERROR = "SET_CODE_ERROR";
const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
const SET_IS_VALID_CODE = "SET_IS_VALID_CODE";
const SET_IS_LOGGING = "SET_IS_LOGGING";

const SET_EXCURSION_DATA = "SET_EXCURSION_DATA";
const SET_IS_JOINED = "SET_IS_JOINED";

const initialState = {
  isAuth: false,
  email: null,
  uid: null,
  isValidCode: false,
  codeError: null,
  emailError: null,
  isLogging: null,
  ex_tid: 3866,

  ex_status: null,
  ex_name: null,
  ex_description: null,
  ex_start_time: null,
  ex_h_cost: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
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
    default:
      return state;
  }
};

export const setEmail = (email) => ({ type: SET_EMAIL, email });
export const setUid = (uid) => ({ type: SET_UID, uid });
export const setCodeError = (codeError) => ({
  type: SET_CODE_ERROR,
  codeError,
});
export const setEmailError = (emailError) => ({
  type: SET_EMAIL_ERROR,
  emailError,
});
export const setIsValidCode = (isValidCode) => ({
  type: SET_IS_VALID_CODE,
  isValidCode,
});
export const setIsLogging = (isLogging) => ({
  type: SET_IS_LOGGING,
  isLogging,
});

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

export const authMe = (uid, sid, ex_tid, navigate) => async (dispatch) => {
  // debugger;
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
          console.log(res);
          dispatch(setIsJoined(true));
          excursionAPI.getExcursion(uid, sid, ex_tid).then((result) => {
            if (result.data.status === "ok") {
              // punkt 10
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

                  navigate("/excursion");

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
            } else {
              // try again screen
            }
          });
        }
      })
      .catch((err) => {
        switch (err.response.data.status) {
          case "already_join":
            // punkt 9

            dispatch(setIsJoined(true));
            excursionAPI.getExcursion(uid, sid, ex_tid).then((result) => {
              if (result.data.status === "ok") {
                // punkt 10
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

                    navigate("/excursion");

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
              } else {
                // try again screen
              }
            });
            break;
          case "forbidden":
            // show error message
            console.log("forbidden");
            break;
          case "limit_reached":
            // show loading screen
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
