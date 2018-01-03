import React from "react";
import {browserHistory} from "react-router";

import Button from "../../../elements/buttons/Button";
import Server from "../../../../services/Server";
import AddExpenseForm from "./AddExpenseForm";
import TransferForm from "./TransferForm";

export default class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {addExpense: true};
  }

  onSubmit(event) {
    let form = event.target;
    let expense = this.createExpenseObjectFrom(form);
    this.clear(form);
    this.add(expense);
    event.preventDefault();
  }

  createExpenseObjectFrom(form) {
    return {
      message: form.message.value,
      money: {
        amount: form.amount.value
      },
      category: {
        name: form.category.value,
        profit: form.profit.value
      }
    };
  }

  clear(form) {
    form.message.value = "";
    form.amount.value = "";
    form.profit.forEach(profit => profit.checked = false);
    form.category.value = "kategoria";
  }

  add(expense) {
    new Server(this.props.login)
      .addExpenseToWallet(this.props.walletID, expense)
      .then(response => this.props.onAdd())
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      });
  }

  onTransferClick() {
    this.setState((state, props) => {
      return {
        addExpense: !state.addExpense
      }
    });
  }

  onTransferSubmit(event) {
    event.preventDefault();
    console.log("onTransferSubmit");
    let form = event.target;
    let expense = this.createTransferExpense(form);
    let profit = this.createTransferProfit(form);
    this.add(expense);
    this.addProfit(profit, form.wallet.value);
    this.clearTransferForm(form);
  }

  clearTransferForm(form) {
    form.message.value = "";
    form.amount.value = "";
    form.wallet.value = "portfel";
  }

  createTransferExpense(form) {
    return {
      message: form.message.value,
      amount: form.amount.value,
      category: {
        name: "transfer",
        profit: false
      }
    };
  }

  createTransferProfit(form) {
    return {
      message: form.message.value,
      amount: form.amount.value,
      category: {
        name: "transfer",
        profit: true
      }
    };
  }

  addProfit(profit, walletID) {
    new Server(this.props.login)
      .addExpenseToWallet(walletID, profit)
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
        id = "add-expense-popup"
        className = {this.props.addExpenseHidden ? "hidden" : ""}>
        <div
          className = "main-container"
          id = "add-expense">
          <Button
            title = "x"
            onClick = {this.props.onClose}
            class = "x-button"/>
          <Button
            title = {this.state.addExpense ? "transfer między portfelami" : "dodaj wydatek"}
            onClick = {this.onTransferClick.bind(this)}
            class = "green-button"/>
          {this.state.addExpense ?
            <AddExpenseForm onSubmit = {this.onSubmit.bind(this)} /> :
            <TransferForm
              onSubmit = {this.onTransferSubmit.bind(this)}
              login = {this.props.login}
              selectedWallet = {this.props.walletID} />}
        </div>
      </div>
    );
  }
}