import React from "react";
import BootstrapTable from "react-bootstrap/es/Table";
import EditableTableDataTick from "./EditableTableDataTick";
import Server from "../../../services/Server";
import Button from "../buttons/Button";
import {browserHistory} from "react-router";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.server = new Server();
    this.state = {toSave: []};
  }

  get rows() {
    return this.props.rows.map(row =>
      <tr key = {row.id}>
        <td>{row.id}</td>
        <td>{row.login}</td>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <EditableTableDataTick
          checked = {row.admin}
          login = {row.login}
          onChange = {this.onChange.bind(this)}/>
      </tr>
    );
  }

  onChange(login, admin) {
    if (this.existsInToSave(login)) {
      this.remove(login);
    } else {
      let newToSave = [];
      newToSave.push({login: login, admin: admin});
      this.updateToSave(newToSave);
    }
  }

  updateToSave(newToSave) {
    this.setState((state, props) => {
      return {
        toSave: state.toSave.concat(newToSave)
      }
    });
  }

  existsInToSave(login) {
    let exists = false;
    this.state.toSave.forEach(user => {
      if (user.login === login) {
        exists = true;
      }
    });
    return exists;
  }

  remove(login) {
    let indexToRemove = -1;
    this.state.toSave.forEach((user, index) => {
      if (user.login === login) {
        indexToRemove = index;
      }
    });
    if (indexToRemove > -1) {
      this.removeFromToSave(indexToRemove);
    }
  }

  removeFromToSave(indexToRemove) {
    this.setState((state, props) => {
      state.toSave.splice(indexToRemove, 1);
      return {
        toSave: state.toSave
      }
    });
  }

  onSave() {

    this.state.toSave.forEach(user => {
      this.server
        .updateAdminStatus(user.login, user.admin)
        .then(response => console.log(response.data))
        .catch(error => {
          if (error.response.status === 500) {
            browserHistory.replace("/server_error");
          } else if (error.response.status === 401) {
            browserHistory.replace("/unauthenticated");
          }
        });
    });
  }

  get head() {
    return this.props.cols.map(col =>
      <td key = {col.id}>
        {col.name}
      </td>
    );
  }

  render() {
    return (
      <div>
        <BootstrapTable striped bordered condensed hover>
          <thead>
            <tr>
              {this.head}
            </tr>
          </thead>
          <tbody>
            {this.rows}
          </tbody>
        </BootstrapTable>
        <Button
          disabled = {this.state.toSave.length === 0}
          class = "green-button"
          title = "zapisz zmiany"
          onClick = {this.onSave.bind(this)} />
      </div>
    );
  }
}