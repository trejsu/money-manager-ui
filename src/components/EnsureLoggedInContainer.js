import React from "react";
import asyncLoad from "react-async-loader";
import {browserHistory} from "react-router";

import Login from "./pages/Login";
import GoogleAuth from "../services/GoogleAuth"
import Server from "../services/Server";

class EnsureLoggedInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      passwordAuthenticated: true,
      googleAuthenticated: true
    };
    this.server = new Server();
  }

  componentDidMount() {
    this.server
      .isLoggedIn()
      .then(response => this.setStateToAuthenticated())
      .catch(error => {
        console.log(error);
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          this.setStateToUnauthenticated();
        }
      });
  }

  onGoogleSuccess() {
    this.server
      .googleLogin({
        login: "",
        password: "",
        token: new GoogleAuth(this.props.gapi).getIdToken()
      })
      .then(response => this.setStateToAuthenticated())
      .catch(error => {
        console.log(error);
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          this.setState({googleAuthenticated: false});
        }
      });
  }

  setStateToAuthenticated() {
    this.setState({authenticated: true});
  }

  setStateToUnauthenticated() {
    this.setState({authenticated: false});
  }

  onPasswordSuccess(login, password) {
    this.server
      .passwordLogin({
        login: login,
        password: password,
        token: ""
      })
      .then(response => {
        console.log("response", response);
        this.setStateToAuthenticated()
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          this.setState({passwordAuthenticated: false});
        }
        });
  }

  render() {
    if (this.state.authenticated === null) {
      return null;
    } else {
      return (this.state.authenticated ?
        this.props.children :
        <Login
          onGoogleSuccess = {this.onGoogleSuccess.bind(this)}
          onPasswordSuccess = {this.onPasswordSuccess.bind(this)}
          googleAuthenticated = {this.state.googleAuthenticated}
          passwordAuthenticated = {this.state.passwordAuthenticated} />);
    }
  }
}

function mapScriptsToProps(ownProps) {
  return {
    gapi: {
      globalPath: 'gapi',
      url: 'https://apis.google.com/js/platform.js?'
    }
  };
}

export default asyncLoad(mapScriptsToProps)(EnsureLoggedInContainer);