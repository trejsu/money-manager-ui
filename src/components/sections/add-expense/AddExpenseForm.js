import React from "react";
import {browserHistory} from "react-router";

import Server from "../../../services/Server";
import NumberInput from "../../elements/inputs/NumberInput";
import Radio from "../../elements/inputs/Radio";
import Select from "../../elements/inputs/Select";
import Text from "../../elements/inputs/Text";
import SubmitButton from "../../elements/buttons/SubmitButton";

export default class AddExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectDisabled: true,
      profit: false,
      buttonDisabled: true,
      amount: null,
      category: ""
    };
    this.server = new Server();
  }

  componentDidMount() {
    this.server.getCategories()
      .then(response => {
        this.setState({categories: response.data})
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
    return !!this.state.amount && this.state.category !== "";
  }

  onAmountChange(event) {
    this.setState({amount: event.target.value});
  }

  onCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  onProfitChange(event) {
    let input = event.target;
    this.setState({
      profit: (input.value === "true"),
      selectDisabled: false
    });
  }

  get categories() {
    let filtered = this.state.categories.filter(category =>
    this.state.profit === category.profit);
    return filtered.map(category =>
        <option
          value = {category.name}
          key = {category.name} >
          {category.name}
        </option>
    );
  }

  onSubmit(event) {
    this.props.onSubmit(event);
    this.setState({
      selectDisabled: true,
      buttonDisabled: true,
      amount: null,
      category: ""
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
        <Radio
          name = "profit"
          value = {true}
          onChange = {this.onProfitChange.bind(this)}
          label = "Przychód" />
        <Radio
          name = "profit"
          value = {false}
          onChange = {this.onProfitChange.bind(this)}
          label = "Wydatek" />
        <Select
          name = "category"
          onChange = {this.onCategoryChange.bind(this)}
          default = "kategoria"
          disabled = {this.state.selectDisabled}
          options = {this.categories} />
        <Text
          name = "message"
          placeholder = "wiadomość" />
        <SubmitButton
          disabled = {this.state.buttonDisabled}
          name = "send"
          label = "dodaj" />
      </form>
    );
  }
}