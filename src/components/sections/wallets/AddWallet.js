import React from "react";
import {browserHistory} from "react-router";

import Server from "../../../services/Server";
import Button from "../../elements/buttons/Button";
import AddWalletForm from "./AddWalletForm";

export default class AddWallet extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(event) {
    let form = event.target;
    let wallet = this.createWalletFromForm(form);
    this.clearForm(form);
    this.add(wallet);
    event.preventDefault();
  }

  createWalletFromForm(form) {
    return {
      name: form.name.value,
      amount: form.amount.value
    };
  }

  clearForm(form) {
    form.name.value = "";
    form.amount.value = "";
  }

  add(wallet) {
    new Server(this.props.login)
      .addWallet(wallet)
      .then(response => this.props.onAdd())
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
        id = "add-wallet-popup"
        className = {this.props.addWalletHidden ? "hidden" : ""}>
        <div
          className = "main-container"
          id = "add-wallet">
          <Button
            title = "x"
            onClick = {this.props.onClose}/>
          <AddWalletForm
            onSubmit = {this.onSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}