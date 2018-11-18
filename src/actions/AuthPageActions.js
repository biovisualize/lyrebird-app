import * as actionTypes from "../constants/actionTypes";
import { query, parseURL } from "./query-utils";
import { getAudios } from "./MainPageActions";

export function redirectToAuth() {
  const clientID = process.env.CLIENT_ID;
  const authURL = `https://myvoice.lyrebird.ai/authorize?response_type=token&client_id=${clientID}&redirect_uri=http://localhost:3000/auth&scope=voice%20profile&state=987654321`;
  window.location = authURL;
}

export function getProfile(accessToken) {
  return function(dispatch) {
    query("profile", accessToken)
      .then(body => dispatch(getProfileSuccess(body)))
      .catch(body => dispatch(getProfileError(body)));
  };
}

export function getProfileSuccess(profile) {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    profile
  };
}

export function getProfileError(error) {
  return {
    type: actionTypes.GET_PROFILE_ERROR,
    error
  };
}

export function receiveAuth() {
  return function(dispatch) {
    const fromURL = parseURL();
    const accessTokenFromURL = fromURL.access_token;
    dispatch(receiveAuthSuccess(accessTokenFromURL));
    dispatch(getProfile(accessTokenFromURL));
    dispatch(getAudios());
  };
}

export function receiveAuthSuccess(accessToken) {
  return {
    type: actionTypes.RECEIVE_AUTH_SUCCESS,
    accessToken
  };
}
