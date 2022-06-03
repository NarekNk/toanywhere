import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import excursionReducer from "./excursionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  excursion: excursionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
