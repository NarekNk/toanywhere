import { useCookies } from "react-cookie";
import { authAPI } from "../api/api";

const SET_EMAIL = "SET_EMAIL";
const SET_UID = "SET_UID";
const SET_CODE_ERROR = "SET_CODE_ERROR";
const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";

const initialState = {
  isAuth: false,
  email: null,
  uid: null,
  codeError: null,
  emailError: null,
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
export const getCode = (email, navigate) => async (dispatch) => {
  await authAPI
    .getCode(email)
    .then((res) => {
      switch (res.data.status) {
        case "ok":
          dispatch(setEmail(email));
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
          const [cookies, setCookie, removeCookie] = useCookies([
            "authCookies",
          ]);
          setCookie("uid", res.data.uid);
          console.log(res.data.uid);
          console.log(cookies.uid);
          // console.log("ok");
          break;
        case "vcode error":
          dispatch(setCodeError("Не верный код! Попробуйте еще раз!"));
          break;
        default:
          dispatch(setCodeError("Что-то пошло не так. Попробуйте еще раз"));
      }
    })
    .catch((err) => {
      console.log("qaq");
    });
};

export default reducer;
