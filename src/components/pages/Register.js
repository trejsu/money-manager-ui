import React from "react";
import asyncLoad from "react-async-loader";
import {browserHistory} from "react-router";

import Button from "../elements/buttons/Button";
import GoogleAuth from "../../services/GoogleAuth";
import Credit from "../Credit"
import Text from "../elements/inputs/Text";
import Password from "../elements/inputs/Password";
import SubmitButton from "../elements/buttons/SubmitButton";
import Server from "../../services/Server";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.server = new Server();
    this.state = {
      loginTaken: false
    }
  }

  onGoogleButtonClick() {
    this.googleAuth = new GoogleAuth(this.props.gapi);
    this.googleAuth.showLoginPopup(this.onSuccess.bind(this));
  }

  onSuccess() {
    this.server
      .registerFromGoogle(this.initializeGoogleUser())
      .then(response => this.googleLogin())
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        }
      });
  }

  googleLogin() {
    this.server
      .googleLogin({
        login: "",
        password: "",
        token: new GoogleAuth(this.props.gapi).getIdToken()
      })
      .then(response => browserHistory.replace("/"))
      .catch(error => {
        console.log(error);
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        }
      });
  }

  initializeGoogleUser() {
    return {
      login: this.googleAuth.getLogin(),
      firstName: this.googleAuth.getUser().getGivenName(),
      lastName: this.googleAuth.getUser().getFamilyName(),
      password: ""
    }
  }

  onFacebookButtonClick() {
    console.log("onFacebookButtonClick");
  }

  onCreateAccountButtonClick(event) {
    let form = event.target;
    let user = this.initializeUser(form);
    this.server
      .registerFromPassword(user)
      .then(response => {
        if (response.status === 200) {
          this.setState({loginTaken: true});
        } else {
          this.passwordLogin(user);
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        }
      });
    this.clearForm(form);
    event.preventDefault();
  }

  passwordLogin(user) {
    this.server
      .passwordLogin({
        login: user.login,
        password: user.password,
        token: ""
      })
      .then(response => browserHistory.replace("/"))
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          this.setState({passwordAuthenticated: false});
        }
      });
  }

  initializeUser(form) {
    return {
      login: form.login.value,
      firstName: form.name.value,
      lastName: "",
      password: form.password.value
    }
  }

  clearForm(form) {
    form.name.value = "";
    form.login.value = "";
    form.password.value = "";
  }

  render() {
    return (
      <div>
        <div
          className = "main-container"
          id = "form">
          <p id = "title">
            MONEY MANAGER
          </p>
          <img src = "./icons/coins.svg" />
          <Button
            class = "google"
            title = "zarejestruj się przez konto google"
            onClick = {this.onGoogleButtonClick.bind(this)} />
          <Button
            class = "facebook"
            title = "zarejestruj się przez konto Facebook"
            onClick = {this.onFacebookButtonClick.bind(this)} />
          <div className = "separator">
            <div className = "middle-separator">
              LUB
            </div>
          </div>
          {this.state.loginTaken ?
            <div className = "unauthorized">
              Wybrany login jest już zajęty
            </div> : ""}
          <form onSubmit = {this.onCreateAccountButtonClick.bind(this)}>
            <Text
              name = "name"
              placeholder = "Twoje imię"/>
            <Text
              name = "login"
              placeholder = "Login"/>
            <Password
              name = "password"
              placeholder = "Hasło"/>
            <SubmitButton
              name = "send"
              label = "utwórz konto" />
          </form>
        </div>
        <Credit />
      </div>
    );
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

export default asyncLoad(mapScriptsToProps)(Register);