import React from "react";
import {browserHistory} from "react-router";
import PropTypes from "prop-types";

import Server from "../../../services/Server";
import SummaryLine from "./SummaryLine";
import DateGenerator from "../../../util/DateGenerator";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.dateGenerator = new DateGenerator();
    this.state = {
      inflow: 0,
      outflow: 0,
      walletId: 0
    }
  }

  componentDidMount() {
    this.updateData(this.props);
    this.props.emitter.on("popup-expense-add", () => this.updateData(this.props));
    this.props.emitter.on("expense-delete", () => this.updateData(this.props));
    this.props.emitter.on("popup-wallet-add", () => this.updateData(this.props));
    this.props.emitter.on("wallet-change",
      (walletId) => this.setState({walletId: walletId},
        () => this.updateData(this.props)))
  }

  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
  }

  updateData(props) {
    if (!!props.login) {
      let period = this.dateGenerator.getDate(props.selected);
      this.updateState(
        () => new Server(props.login).getSummaryForWalletAndTimePeriod(
          this.state.walletId,
          period.start,
          period.end
        )
      );
    }
  }

  updateState(getSummary) {
    getSummary()
      .then(response => this.setState({
        inflow: response.data.inflow.amount,
        outflow: response.data.outflow.amount
      }))
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      })
  }

  get sum() {
    return this.state.inflow - this.state.outflow;
  }

  render() {
    return (
      <div className = "main-container" id = "summary">
        <SummaryLine id = "inflow" title = "Przychody" amount = {this.state.inflow} />
        <SummaryLine id = "outflow" title = "Wydatki" amount = {this.state.outflow} />
        <hr />
        <SummaryLine id = "sum" title = "Suma" amount = {this.sum} />
      </div>
    );
  }
}

Summary.propTypes = {
  emitter: PropTypes.object,
  login: PropTypes.string
};