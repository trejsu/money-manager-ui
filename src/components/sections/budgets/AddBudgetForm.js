import React from "react";
import {browserHistory} from "react-router";

import Server from "../../../services/Server";
import NumberInput from "../../elements/inputs/NumberInput";
import Radio from "../../elements/inputs/Radio";
import Select from "../../elements/inputs/Select";
import Text from "../../elements/inputs/Text";
import SubmitButton from "../../elements/buttons/SubmitButton";
import Date from "../../elements/inputs/Date";
import DateGenerator from "../../../util/DateGenerator";

export default class AddBudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      buttonDisabled: true,
      amount: null,
      category: null,
      start: "",
      end: ""
    };
    this.server = new Server();
  }

  // todo: extract error handling to some error utils?
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

  // todo: setState warning
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
    return !!this.state.amount
      && !!this.state.category
      && !!this.state.start
      && !!this.state.end;
  }

  onAmountChange(event) {
    this.setState({amount: event.target.value});
  }

  onCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  onStartChange(event) {
    this.setState({start: event.target.value});
  }

  onEndChange(event) {
    this.setState({end: event.target.value});
  }

  get categories() {
    let filtered = this.state.categories.filter(category =>
    category.profit === false && category.name !== "transfer");
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
      buttonDisabled: true,
      amount: null,
      category: null,
      start: "",
      end: ""
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
          name = "category"
          onChange = {this.onCategoryChange.bind(this)}
          default = "kategoria"
          options = {this.categories} />
        <Date
          name = "start"
          placeholder = "początek"
          onChange = {this.onStartChange.bind(this)} />
        <Date
          name = "end"
          placeholder = "koniec"
          onChange = {this.onEndChange.bind(this)}
          min = {new DateGenerator().getTomorrow()} />
        <SubmitButton
          disabled = {this.state.buttonDisabled}
          name = "send"
          label = "dodaj" />
      </form>
    );
  }
}