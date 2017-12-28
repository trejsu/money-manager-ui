import React from "react";
import {browserHistory} from "react-router";

import Button from "../../elements/buttons/Button";
import AddBudgetForm from "./AddBudgetForm";
import Server from "../../../services/Server";

export default class AddWallet extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(event) {
    let form = event.target;
    let budget = this.createBudgetFromForm(form);
    this.clearForm(form);
    this.add(budget);
    event.preventDefault();
  }

  createBudgetFromForm(form) {
    return {
      category: {
        name: form.category.value,
        profit: false
      },
      total: form.amount.value,
      start: form.start.value,
      end: form.end.value
    };
  }

  clearForm(form) {
    form.category.value = "kategoria";
    form.amount.value = "";
    form.start.value = "";
    form.end.value = "";
  }

  add(budget) {
    new Server(this.props.login)
      .addBudget(budget)
      .then(response => this.props.onAdd())
      .catch(error => {
        console.log(error);
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
        id = "add-budget-popup"
        className = {this.props.hidden ? "hidden" : ""}>
        <div
          className = "main-container"
          id = "add-budget">
          <Button
            title = "x"
            onClick = {this.props.onClose}
            class = "x-button"/>
          <AddBudgetForm
            onSubmit = {this.onSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}