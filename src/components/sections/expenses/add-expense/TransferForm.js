import React from "react";
import {browserHistory} from "react-router";

import Server from "../../../../services/Server";
import NumberInput from "../../../elements/inputs/NumberInput";
import Radio from "../../../elements/inputs/Radio";
import Select from "../../../elements/inputs/Select";
import Text from "../../../elements/inputs/Text";
import SubmitButton from "../../../elements/buttons/SubmitButton";

export default class TransferForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      amount: null,
      wallets: [],
      wallet: null
    };
  }

  componentDidMount() {
    new Server(this.props.login).getWallets()
      .then(response => {
        this.setState({wallets: response.data})
      })
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      });
  }

  componentDidUpdate() {
    if (this.state.buttonDisabled) {
      this.checkDataPresence();
    } else {
      this.checkDataAbsence();
    }
  }

  checkDataPresence() {
    if (this.requiredFieldsPresent()) {
      this.setState({buttonDisabled: false});
    }
  }

  checkDataAbsence() {
    if (!this.requiredFieldsPresent()) {
      this.setState({buttonDisabled: true});
    }
  }

  requiredFieldsPresent() {
    return !!this.state.amount && !!this.state.wallet;
  }

  onAmountChange(event) {
    this.setState({amount: event.target.value});
  }

  onWalletChange(event) {
    this.setState({wallet: event.target.value});
  }

  get wallets() {
    let filtered = this.state.wallets.filter(wallet =>
    wallet.id !== this.props.selectedWallet && wallet.id !== 0);
    return filtered.map(wallet =>
      <option
        value = {wallet.id}
        key = {wallet.id} >
        {wallet.name}
      </option>
    );
  }

  onSubmit(event) {
    console.log("onSubmit");
    this.props.onSubmit(event);
    this.setState({
      buttonDisabled: true,
      amount: null,
      wallet: null
    });
  }

  render() {
    return (
      <form
        id = "add-form"
        onSubmit = {this.onSubmit.bind(this)}>
        <NumberInput
          name = "amount"
          min = "0.01"
          step = "0.01"
          placeholder = "suma"
          onChange = {this.onAmountChange.bind(this)} />
        <Select
          name = "wallet"
          onChange = {this.onWalletChange.bind(this)}
          default = "portfel"
          options = {this.wallets} />
        <Text
          name = "message"
          placeholder = "wiadomość" />
        <SubmitButton
          disabled = {this.state.buttonDisabled}
          name = "send"
          label = "przetransferuj" />
      </form>
    );
  }
}