import { combineReducers } from "redux";
import authenticationReducer from "./components/auth/reducer";
import userReducer from "./components/user/reducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer
});

export default rootReducer;
