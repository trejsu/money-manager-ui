import React from "react";
import {browserHistory} from "react-router";

import StatisticsExpenseElement from "./StatisticsExpenseElement";
import Server from "../../../services/Server";
import DateGenerator from "../../../util/DateGenerator";

export default class HighestExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expense: null};
    this.dateGenerator = new DateGenerator();
  }

  componentDidMount() {
    this.updateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
  }

  updateData(props) {
    if (!!props.login) {
      let period = this.dateGenerator.getDate(props.selected);
      this.updateState(
        () => new Server(props.login).getHighestExpenseForWalletAndTimePeriod(
          props.walletID,
          period.start,
          period.end
        )
      );
    }
  }

  updateState(getExpense) {
    getExpense()
      .then(response => {
        this.setState({expense: response.data})
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      })
  }

  render() {
    return (
      <div>
        <div className = "title">
          Największy wydatek
        </div>
        {!!this.state.expense ? <StatisticsExpenseElement expense = {this.state.expense} /> : ""}
      </div>
    );
  }
}

