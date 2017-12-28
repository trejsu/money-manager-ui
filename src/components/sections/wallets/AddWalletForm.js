import React from "react";
import NumberInput from "../../elements/inputs/NumberInput";
import Text from "../../elements/inputs/Text";
import SubmitButton from "../../elements/buttons/SubmitButton";

export default class AddWalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      amount: null,
      name: ""
    }
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
    return !!this.state.amount && this.state.name !== "";
  }

  onAmountChange(event) {
    this.setState({amount: event.target.value});
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  onSubmit(event) {
    this.props.onSubmit(event);
    this.setState({
      buttonDisabled: true,
      amount: null,
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
          placeholder = "kwota początkowa"
          onChange = {this.onAmountChange.bind(this)} />
        <Text
          name = "name"
          placeholder = "nazwa"
          onChange = {this.onNameChange.bind(this)} />
        <SubmitButton
          disabled = {this.state.buttonDisabled}
          name = "send"
          label = "dodaj" />
      </form>
    );
  }
}