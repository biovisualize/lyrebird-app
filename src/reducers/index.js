import { combineReducers } from "redux";
import main from "./mainPageReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  main,
  auth
});

export default rootReducer;
