import React from "react";
import {browserHistory} from "react-router";
const R = require('ramda');

import BudgetElement from "./BudgetElement";
import Button from "../../elements/buttons/Button";
import Server from "../../../services/Server";
import BudgetTabs from "./BudgetTabs";
import DateGenerator from "../../../util/DateGenerator";
import ContinuousScrollingList from "../../elements/ContinuousScrollingList";

export default class Budgets extends React.Component {

  static get ELEMENTS_TO_LOAD() { return 3; }

  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      selectedTab: 1,
      isLoading: false,
      items: []
    };
    this.dateGenerator = new DateGenerator();
  }

  componentDidMount() {
    this.update(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.propsChanged(nextProps)) {
      this.update(nextProps);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  propsChanged(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  update(props) {
    if (!!props.login) {
      let period = this.dateGenerator.getDateForBudgetTabs(this.state.selectedTab);
      new Server(props.login)
        .getBudgetsForTimePeriod(period)
        .then(response => {
          const sortById = R.sortWith([R.descend(R.prop('id'))]);
          const sorted = sortById(response.data);
          this.setState({
            budgets: sorted,
            items: sorted.slice(0, Budgets.ELEMENTS_TO_LOAD)
          })
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 500) {
            browserHistory.replace("/server_error");
          } else if (error.response.status === 401) {
            browserHistory.replace("/unauthenticated");
          }
        });
    }
  }

  onAdd() {
    this.props.onAddBudget();
  }

  get budgets() {
    return this.state.items.map(budget =>
      <BudgetElement
        budget = {budget}
        completed = {this.state.selectedTab === 0} />);
  }

  onTabSelected(item) {
    this.setState((state, props) => {
      return {
        selectedTab: item
      }
    }, () => this.update(this.props));
  }

  loadMoreElements() {
    let itemsToAdd = 3;
    let secondsToWait = 2;
    this.setState({ isLoading: true });
    this.timeout = setTimeout(() => {
      let currentItems = this.state.items;
      for (let i = 0; i < itemsToAdd; i++) {
        if (this.state.budgets.length > this.state.items.length) {
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
    return this.state.budgets[this.state.items.length];
  }

  render() {
    return (
      <div id = "budgets">
        <BudgetTabs
          selected = {this.state.selectedTab}
          onTabSelected = {this.onTabSelected.bind(this)} />
        <Button
          class = "green-button"
          title = "nowy budżet"
          onClick = {this.onAdd.bind(this)} />
        <ContinuousScrollingList
          elements = {this.budgets}
          selected = {this.props.selected}
          onEnter = {this.loadMoreElements.bind(this)}
          isLoading = {this.state.isLoading} />
      </div>
    );
  }
}