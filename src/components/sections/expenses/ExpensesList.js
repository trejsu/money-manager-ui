import React from "react";
import {browserHistory} from "react-router";
import { sortWith, descend, prop } from 'ramda'
import PropTypes from "prop-types";

import Server from "../../../services/Server";
import Button from "../../elements/buttons/Button";
import ExpenseElement from "./ExpenseElement";
import ContinuousScrollingList from "../../elements/ContinuousScrollingList";
import DateGenerator from "../../../util/DateGenerator";

export default class ExpensesList extends React.Component {

  static get ELEMENTS_TO_LOAD() { return 3; }

  constructor(props) {
    super(props);
    this.dateGenerator = new DateGenerator();
    this.state = {
      elements: [],
      isLoading: false,
      items: []
    };
  }

  componentDidMount() {
    this.updateData(this.props);
    this.props.emitter.on("popup-expense-add", () => this.updateData(this.props))
  }

  componentWillReceiveProps(nextProps) {
    if (this.propsChanged(nextProps)) {
      this.updateData(nextProps);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  propsChanged(nextProps) {
    return ((this.props.selected !== nextProps.selected)
            || (this.props.walletID !== nextProps.walletID)
            || (this.props.login !== nextProps.login)
            || (this.props.addWalletHidden !== nextProps.addWalletHidden));
  }

  updateData(props) {
    if (props.login) {
      let period = this.dateGenerator.getDate(props.selected);
      this.updateState(
        () =>  new Server(props.login).getExpensesForWalletAndTimePeriod(
          props.walletID,
          period.start,
          period.end
        )
      );
    }
  }

  updateState(getExpenses) {
    getExpenses()
      .then(response => {
        const sortByDate = sortWith([descend(prop('id'))]);
        const sorted = sortByDate(response.data);
        this.setState({
          elements: sorted,
          items: sorted.slice(0, ExpensesList.ELEMENTS_TO_LOAD)
        });
      })
      .catch(error => {
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      });
  }

  get elements() {
    return this.state.items.map(element =>
      <ExpenseElement expense = {element} onDelete = {this.onDelete.bind(this)} />
    );
  }

  loadMoreElements() {
    let itemsToAdd = 3;
    let secondsToWait = 2;
    this.setState({ isLoading: true });
    this.timeout = setTimeout(() => {
      let currentItems = this.state.items;
      for (let i = 0; i < itemsToAdd; i++) {
        if (this.state.elements.length > this.state.items.length) {
          currentItems.push(this.generateItem());
        }
      }
      this.setState({
        items: currentItems,
        isLoading: false
      });
    }, secondsToWait * 1000);
  }

  generateItem() {
    return this.state.elements[this.state.items.length];
  }

  onAdd() {
    this.props.emitter.emit("expense-add");
  }

  // todo: check what happens on error
  onDelete(id) {
    new Server(this.props.login)
      .deleteExpenseFromWallet(this.props.walletID, id)
      .then(() => {
        this.updateData(this.props);
        this.props.emitter.emit("expense-delete");
      });
  }

  render() {
    return (
      <div>
        <Button
          title = "dodaj wydatek"
          class = "green-button"
          onClick = {this.onAdd.bind(this)}
          disabled = {this.props.walletID === 0} />
        <ContinuousScrollingList
          elements = {this.elements}
          onEnter = {this.loadMoreElements.bind(this)}
          isLoading = {this.state.isLoading} />
      </div>
    );
  }
}

ExpensesList.propTypes = {
  onAdd: PropTypes.func,
  emitter: PropTypes.object,
  login: PropTypes.string,
  selected: PropTypes.number,
  walletID: PropTypes.number,
  addExpenseHidden: PropTypes.bool,
  addWalletHidden: PropTypes.bool
};

