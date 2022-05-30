const SET_EMAIL = "SET_EMAIL";

const initialState = {
  isAuth: false,
  email: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
};

export const setEmail = (email) => ({ type: SET_EMAIL, email });

export default reducer;
