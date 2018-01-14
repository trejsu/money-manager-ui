import React from "react";
import {browserHistory} from "react-router";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";

import ClickableList from "../../elements/ClickableList";
import Button from "../../elements/buttons/Button";

import Server from "../../../services/Server";

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      selectedWallet: 0
    };
  }

  componentDidMount() {
    this.update(this.props);
    this.props.emitter.on("expense-delete", () => this.update(this.props));
    this.props.emitter.on("popup-expense-add", () => this.update(this.props))
  }

  componentWillReceiveProps(newProps) {
    if (this.propsChanged(newProps)) {
      this.update(newProps);
    }
  }

  propsChanged(newProps) {
    return this.props.login !== newProps.login
      || this.props.addWalletHidden !== newProps.addWalletHidden;
  }

  update(props) {
    if (props.login) {
      new Server(props.login)
        .getWallets()
        .then(response => {
          if (response.data.length !== 0) {
            this.handleGetWalletsResponse(response.data);
          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 500) {
            browserHistory.replace("/server_error");
          } else if (error.response.status === 401) {
            browserHistory.replace("/unauthenticated");
          }
        });
    }
  }

  handleGetWalletsResponse(newWallets) {
    let walletsLength = this.state.wallets.length;
    this.setState({wallets: newWallets});
    if (walletsLength !== 0 && newWallets.length > walletsLength) {
      this.setState({selectedWallet: walletsLength});
    }
  }

  get wallets() {
    return this.state.wallets.map(wallet =>
      <div id = "wallet">
        <Col className = "wallet-col" lg = {6} md = {6} sm = {12} xs = {6}>
           <div id = "name">
            {wallet.name}
          </div>
        </Col>
        <Col className = "wallet-col" lg = {6} md = {6} sm = {12} xs = {6}>
           <div id = "amount">
            {wallet.money.amount.toFixed(2)}
          </div>
        </Col>
      </div>
    );
  }

  onItemSelected(index) {
    this.setState({selectedWallet: index});
    this.onChange(this.props, this.state.wallets, index);
  }

  onChange(props, wallets, index) {
    props.onChange(wallets[index].id);
  }

  onAdd() {
    this.props.onAdd();
  }

  render() {
    return (
      <div
        className = "main-container"
        id = "menu">
        <div id = "title">
          PORTFELE
        </div>
        <hr />
        <ClickableList
          elements = {this.wallets}
          onClick = {this.onItemSelected.bind(this)}
          selectedItem = {this.state.selectedWallet}
        />
        <Button
          title = "dodaj portfel"
          onClick = {this.onAdd.bind(this)} />
      </div>
    );
  }
}

Wallet.propTypes = {
  onAdd: PropTypes.func,
  login: PropTypes.string,
  addExpenseHidden: PropTypes.bool,
  addWalletHidden: PropTypes.bool,
  emitter: PropTypes.object
};