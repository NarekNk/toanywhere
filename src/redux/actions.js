export const SET_EMAIL = "SET_EMAIL";
export const SET_UID = "SET_UID";
export const SET_CODE_ERROR = "SET_CODE_ERROR";
export const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
export const SET_IS_VALID_CODE = "SET_IS_VALID_CODE";
export const SET_IS_LOGGING = "SET_IS_LOGGING";

export const SET_EXCURSION_DATA = "SET_EXCURSION_DATA";
export const SET_IS_JOINED = "SET_IS_JOINED";
export const SET_EX_CURRENT = "SET_EX_CURRENT";
export const SET_STREAM_DATA = "SET_STREAM_DATA";

export const SET_FORBIDDEN = "SET_FORBIDDEN";
export const SET_LIMIT_REACHED = "SET_LIMIT_REACHED";

export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";

export const SET_PAY_PURPOSE = "SET_PAY_PURPOSE";

export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  isLoading,
});
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
export const setExCurrent = (ex_current) => ({
  type: SET_EX_CURRENT,
  ex_current,
});
export const setStreamData = (ex_room_id, ex_stream_id) => ({
  type: SET_STREAM_DATA,
  ex_room_id,
  ex_stream_id,
});

export const setIsJoined = (isJoined) => ({ type: SET_IS_JOINED, isJoined });
export const setExcursionData = (
  ex_status,
  ex_name,
  ex_description,
  ex_time_start,
  ex_h_cost
) => ({
  type: SET_EXCURSION_DATA,
  ex_status,
  ex_name,
  ex_description,
  ex_time_start,
  ex_h_cost,
});

export const setMessage = (messageText, func, backTo) => ({
  type: SET_MESSAGE,
  payload: { messageText, func, backTo },
});

export const setPayPurpose = (payPurpose) => ({
  type: SET_PAY_PURPOSE,
  payPurpose,
});
