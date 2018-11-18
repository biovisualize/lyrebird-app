import React from "react";
import { Link } from "react-router-dom";
import * as Actions from "../actions/MainPageActions";
import Player from "./Player";

const Main = props => {
  function onGenerateClick() {
    props.dispatch(Actions.generateAudio(props.inputText));
  }

  function onPlayClick(url) {
    return () => {
      const timestamp = new Date().getTime();
      props.dispatch(Actions.setSource(url, timestamp));
    };
  }

  function onTextInput(event) {
    props.dispatch(Actions.setInputText(event.target.value));
  }

  if (props.accessToken) {
    return (
      <div className="container">
        <div className="header">
          <div className="title">Testing the Lyrebird API</div>
          <div className="login">
            Logged-in as {props.profile ? props.profile.display_name : ""}
          </div>
        </div>
        <div className="content">
          {props.source && <Player source={props.source} />}

          <div className="generator">
            <input type="text" onInput={onTextInput} value={props.inputText} />
            <button className="generate" onClick={onGenerateClick}>
              Generate
            </button>
          </div>

          <div className="audio-list">
            {props.audios &&
              props.audios.results.map((audio, i) => {
                return (
                  <div className="audio-bar" key={`audio-${i}`}>
                    <button onClick={onPlayClick(audio.url)}>Play</button>
                    <div className="audio-text">{audio.text}</div>
                    <div className="audio-timestamp">
                      {new Date(audio.created_at).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="header">
          <div className="title">Testing the Lyrebird API</div>
          <div className="login">
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="content">
          <div className="message">
            <p>
              This is a quick prototype to test{" "}
              <a
                href="https://lyrebird.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lyrebird
              </a>{" "}
              API.
            </p>
            <p>
              Please <Link to="/login">Log-in</Link> to try it.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
