import { authAPI } from "../api/api";

const SET_EMAIL = "SET_EMAIL";
const SET_UID = "SET_UID";
const SET_CODE_ERROR = "SET_CODE_ERROR";
const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
const SET_IS_VALID_CODE = "SET_IS_VALID_CODE";
const SET_IS_LOGGING = "SET_IS_LOGGING";

const initialState = {
  isAuth: false,
  email: null,
  uid: null,
  isValidCode: false,
  codeError: null,
  emailError: null,
  isLogging: null,
};

const reducer = (state = initialState, action) => {
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

export const authMe = (uid, sid, navigate) => async (dispatch) => {
  await authAPI
    .authMe(uid, sid)
    .then((res) => {
      if (res.data.status === "ok") {
        navigate("/excursion");
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
  await authAPI
    .sendRestoreCode(email, code)
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

export default reducer;
