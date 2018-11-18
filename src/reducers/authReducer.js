import * as actionTypes from "../constants/actionTypes";
import objectAssign from "object-assign";

export const initialState = {
  accessToken: "",
  profile: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_AUTH_SUCCESS:
      return objectAssign({}, state, {
        accessToken: action.accessToken
      });

    case actionTypes.GET_PROFILE_SUCCESS:
      return objectAssign({}, state, { profile: action.profile, error: null });

    case actionTypes.GET_PROFILE_ERROR:
      return objectAssign({}, state, { profile: null, error: action.error });

    default:
      return state;
  }
}
