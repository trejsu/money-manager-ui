import React from "react";
import Credit from "../../Credit";
import Server from "../../../services/Server";
import Table from "../../elements/table/Table";
import {browserHistory} from "react-router";

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.server = new Server();
    this.state = {users: []};
  }

  componentDidMount() {
    this.server
      .getUsers()
      .then(response => this.setState({users: response.data}))
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      });
  }

  get cols() {
    return [{
      id: "id",
      name: "#",
      editable: false
    }, {
      id: "login",
      name: "Login",
      editable: false
    }, {
      id: "firstName",
      name: "Imię",
      editable: false
    }, {
      id: "lastName",
      name: "Nazwisko",
      editable: false
    }, {
      id: "admin",
      name: "Admin",
      editable: true
    }];
  }

  get rows() {
    return this.state.users.map((user, index) => {
      return {
        id: index,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
    }});
  }

  render() {
    return (
      <div>
        <div
          className = "main-container"
          id = "form">
          <p id = "title">
            PANEL ADMINA
          </p>
          <img src = "./resources/icons/people.svg" />
          <Table
            cols = {this.cols}
            rows = {this.rows} />
        </div>
        <Credit />
      </div>
    );
  }
}