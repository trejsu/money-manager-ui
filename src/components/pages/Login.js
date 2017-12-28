import React from "react";
import asyncLoad from "react-async-loader";
import {browserHistory, Link} from "react-router";

import Button from "../elements/buttons/Button";
import GoogleAuth from "../../services/GoogleAuth";
import Credit from "../Credit"
import Text from "../elements/inputs/Text";
import Password from "../elements/inputs/Password";
import SubmitButton from "../elements/buttons/SubmitButton";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  onGoogleButtonClick() {
    new GoogleAuth(this.props.gapi).showLoginPopup(this.props.onGoogleSuccess);
  }

  onFacebookButtonClick() {
    console.log("onFacebookButtonClick");
  }

  onLoginButtonClick(event) {
    let form = event.target;
    this.props.onPasswordSuccess(form.login.value, form.password.value);
    this.clearForm(form);
    event.preventDefault();
  }

  clearForm(form) {
    form.login.value = "";
    form.password.value = "";
  }

  onRegisterLinkClick() {
    browserHistory.replace("/register");
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
          <img src = "./resources/icons/coins.svg" />
          {this.props.googleAuthenticated ? "" :
            <div className = "unauthorized">
              Niepoprawny email lub hasło
            </div>}
          <Button
            class = "google"
            title = "zaloguj się przez konto google"
            onClick = {this.onGoogleButtonClick.bind(this)} />
          <Button
            class = "facebook"
            title = "zaloguj się przez konto Facebook"
            onClick = {this.onFacebookButtonClick.bind(this)} />
          <div className = "separator">
            <div className = "middle-separator">
              LUB
            </div>
          </div>
          {this.props.passwordAuthenticated ? "" :
            <div className = "unauthorized">
              Niepoprawny email lub hasło
            </div>}
          <form onSubmit = {this.onLoginButtonClick.bind(this)}>
            <Text
              name = "login"
              placeholder = "Login"/>
            <Password
              name = "password"
              placeholder = "Hasło"/>
            <SubmitButton
              name = "send"
              label = "zaloguj się" />
          </form>
          <div className = "register">
            Nie posiadasz konta? &nbsp;
            <Link to = "/register">
                Zarejestruj się
            </Link>
          </div>
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

export default asyncLoad(mapScriptsToProps)(Login);