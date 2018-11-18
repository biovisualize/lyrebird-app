import * as actionTypes from "../constants/actionTypes";
import { query } from "./query-utils";

export function getAudios() {
  return function(dispatch, getState) {
    const accesToken = getState().auth.accessToken;
    query("generated", accesToken)
      .then(body => dispatch(getAudiosSuccess(body)))
      .catch(body => dispatch(getAudiosError(body)));
  };
}

export function getAudiosSuccess(audios) {
  return {
    type: actionTypes.GET_AUDIOS_SUCCESS,
    audios
  };
}

export function getAudiosError(error) {
  return {
    type: actionTypes.GET_AUDIOS_ERROR,
    error
  };
}

export function generateAudio(text) {
  return function(dispatch, getState) {
    const accesToken = getState().auth.accessToken;
    const request = `https://avatar.lyrebird.ai/api/v0/generate`;
    return fetch(request, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accesToken}`,
        "Content-Type": "audio/wav"
      },
      body: JSON.stringify({
        text
      })
    }).then(response => {
      if (response.status === 200) {
        dispatch(generateAudioSuccess());
        dispatch(getAudios());
      } else {
        dispatch(generateAudioError(response.status));
      }
    });
  };
}

export function generateAudioSuccess() {
  return {
    type: actionTypes.GENERATE_AUDIO_SUCCESS
  };
}

export function generateAudioError(error) {
  return {
    type: actionTypes.GENERATE_AUDIO_ERROR,
    error
  };
}

export function setSource(url, timestamp) {
  return {
    type: actionTypes.SET_SOURCE,
    url,
    timestamp
  };
}

export function setInputText(inputText) {
  return {
    type: actionTypes.SET_INPUT_TEXT,
    inputText
  };
}
