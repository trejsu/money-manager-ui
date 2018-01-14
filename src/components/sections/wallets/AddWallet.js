import React from "react";
import {browserHistory} from "react-router";
import PropTypes from "prop-types";

import Server from "../../../services/Server";
import Button from "../../elements/buttons/Button";
import AddWalletForm from "./AddWalletForm";

export default class AddWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hidden: true};
  }

  componentDidMount() {
    this.props.emitter.on("wallet-add", () => this.showPopup())
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
      money: {
        amount: form.amount.value
      }
    };
  }

  clearForm(form) {
    form.name.value = "";
    form.amount.value = "";
  }

  add(wallet) {
    new Server(this.props.login)
      .addWallet(wallet)
      .then(() => this.onAdd())
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      });
  }

  onClose() {
    this.setState({hidden: true});
    this.enableScroll();
  }

  enableScroll() {
    if (document.body.style.overflowY === "hidden") {
      document.body.style.overflowY = "scroll";
    }
  }

  onAdd() {
    this.props.emitter.emit("popup-wallet-add");
    this.onClose();
  }

  showPopup() {
    this.setState({hidden: false});
    this.disableScroll();
  }

  disableScroll() {
    if (this.isScrollBarPresent()) {
      document.body.style.overflowY = "hidden";
    }
  }

  isScrollBarPresent() {
    let root = (document.compatMode === 'BackCompat') ?
      document.body : document.documentElement;
    return root.scrollHeight > root.clientHeight;
  }

  render() {
    return (
      <div
        id = "add-wallet-popup"
        className = {this.state.hidden ? "hidden" : ""}>
        <div
          className = "main-container"
          id = "add-wallet">
          <Button
            title = "x"
            onClick = {this.onClose.bind(this)}/>
          <AddWalletForm
            onSubmit = {this.onSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}

AddWallet.propTypes = {
  emitter: PropTypes.object,
  login: PropTypes.string
};