import { combineReducers } from "redux";
import authenticationReducer from "../components/auth/reducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer
});

export default rootReducer;
