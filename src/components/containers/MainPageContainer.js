import { connect } from "react-redux";
import Main from "../Main";

function mapStateToProps(state) {
  return {
    text: state.main.text,
    inputText: state.main.inputText,
    waveform: state.main.waveform,
    audios: state.main.audios,
    error: state.main.error,
    accessToken: state.auth.accessToken,
    profile: state.auth.profile,
    source: state.main.source
  };
}

export default connect(mapStateToProps)(Main);
