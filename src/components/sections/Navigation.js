import React from "react";
import {Col, Row} from "react-bootstrap";
import asyncLoad from "react-async-loader";
import {browserHistory} from "react-router";

import Greeting from "../Greeting"
import Button from "../elements/buttons/Button"
import GoogleAuth from "../../services/GoogleAuth";
import Server from "../../services/Server";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.googleAuth = new GoogleAuth(this.props.gapi);
    this.server = new Server();
  }

  onLogoutSuccess() {
    window.location.href = "/";
    this.server
      .logout()
      .then(response => console.log(response))
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      });
  }

  render() {
    return (
      <div
        className = "main-container"
        id = "navigation">
        <Row>
          <Col xs = {2} sm = {1} md = {1} lg = {1}>
            <img src = "./resources/icons/user_filled.svg" />
          </Col>
          <Col xs = {10} sm = {6} md = {6} lg = {6}>
            <Greeting user = {this.props.name} />
          </Col>
          <Col xs = {12} sm = {5} md = {5} lg = {5}>
            <Button
              onClick = {() => new GoogleAuth(this.props.gapi)
                .signOut(this.onLogoutSuccess.bind(this))}
              title = "wyloguj się" />
          </Col>
        </Row>
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

export default asyncLoad(mapScriptsToProps)(Navigation);