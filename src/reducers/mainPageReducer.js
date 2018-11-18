import * as actionTypes from "../constants/actionTypes";
import objectAssign from "object-assign";

export const initialState = {
  text: "",
  waveform: null,
  audios: null,
  error: null,
  source: null,
  inputText: ""
};

export default function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GENERATE_AUDIO:
      return objectAssign({}, state, { text: action.text });

    case actionTypes.GENERATE_AUDIO_SUCCESS:
      return objectAssign({}, state, { error: null });

    case actionTypes.GENERATE_AUDIO_ERROR:
      return objectAssign({}, state, { error: action.error });

    case actionTypes.GET_AUDIOS_SUCCESS:
      return objectAssign({}, state, { audios: action.audios, error: null });

    case actionTypes.GET_AUDIOS_ERROR:
      return objectAssign({}, state, { audios: null, error: action.error });

    case actionTypes.GET_AUDIO_SUCCESS:
      return objectAssign({}, state, {
        waveform: action.waveform,
        error: null
      });

    case actionTypes.GET_AUDIO_ERROR:
      return objectAssign({}, state, { waveform: null, error: action.error });

    case actionTypes.SET_SOURCE:
      return objectAssign({}, state, {
        source: { url: action.url, timestamp: action.timestamp }
      });

    case actionTypes.SET_INPUT_TEXT:
      return objectAssign({}, state, { inputText: action.inputText });

    default:
      return state;
  }
}
