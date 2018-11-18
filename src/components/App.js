/* eslint-disable import/no-named-as-default */
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPageContainer from "./containers/MainPageContainer";
import NotFoundPage from "./NotFoundPage";
import { receiveAuth, redirectToAuth } from "../actions/AuthPageActions";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPageContainer} />
        <Route
          path="/auth"
          render={() => {
            this.props.dispatch(receiveAuth());
            return <Redirect to="/" />;
          }}
        />
        <Route
          path="/login"
          render={() => {
            setTimeout(() => redirectToAuth(), 3000);
            return (
              <div className="container">
                <div className="header">
                  <div className="title">Testing the Lyrebird API</div>
                  <div className="login">Logging in...</div>
                </div>
                <div className="content">
                  <div className="message">
                    You are being redirected to Lyrebird for authentication in 3 seconds.
                  </div>
                </div>
              </div>
            );
          }}
        />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

export default hot(module)(App);
