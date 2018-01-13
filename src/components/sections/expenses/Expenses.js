import React from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Tabs from "../Tabs";
import ExpensesList from "./ExpensesList";

export default class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 3};
  }

  onTabSelected(item) {
    this.setState({selectedTab: item});
  }

  render() {
    return (
      <div id = "expenses-list">
        <Tabs
          selected = {this.state.selectedTab}
          onTabSelected = {this.onTabSelected.bind(this)} />
        <Summary
          selected = {this.state.selectedTab}
          walletID = {this.props.walletID}
          addExpenseHidden = {this.props.addExpenseHidden}
          addWalletHidden = {this.props.addWalletHidden}
          login = {this.props.login} />
        <ExpensesList
          selected = {this.state.selectedTab}
          onAdd = {this.props.onAddExpense}
          walletID = {this.props.walletID}
          addExpenseHidden = {this.props.addExpenseHidden}
          addWalletHidden = {this.props.addWalletHidden}
          login = {this.props.login}
          emitter = {this.props.emitter}/>
      </div>
    );
  }
}

Expenses.propTypes = {
  walletID: PropTypes.number,
  addExpenseHidden: PropTypes.bool,
  addWalletHidden: PropTypes.bool,
  login: PropTypes.string,
  onAddExpense: PropTypes.func,
  emitter: PropTypes.object
};