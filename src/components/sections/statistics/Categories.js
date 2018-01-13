import React from "react";
import {browserHistory} from "react-router";
import {Col, Grid} from "react-bootstrap";

import DateGenerator from "../../../util/DateGenerator";
import Server from "../../../services/Server";
import ClickableList from "../../elements/ClickableList";

const R = require('ramda');

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {categories: null};
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
        () => new Server(props.login).getCountedCategoriesForWalletAndTimePeriod(
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
        this.setState({categories: response.data})
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

  get categories() {
    const sortBySecondValue = R.sortWith([R.descend(R.prop(1))]);
    const sorted = sortBySecondValue(Object.entries(this.state.categories));
    const sum = Object.values(this.state.categories).reduce((a, b) => a + b, 0);
    return sorted.map((entry, index) =>
      <div key = {index}>
        <Grid id = "grid">
          <Col
            className = "category-col"
            lg = {7} md = {7} sm = {7} xs = {7}>
            <span id = "category">
              {entry[0]}
            </span>
          </Col>
          <Col
            className = "category-col"
            lg = {3} md = {3} sm = {3} xs = {3}>
            <span id = "amount">
              {entry[1]}
            </span>
          </Col>
          <Col
            className = "category-col"
            lg = {2} md = {2} sm = {2} xs = {2}>
            <span id = "percentage">
              ({(entry[1] * 100 / sum).toFixed(0)}%)
            </span>
          </Col>
        </Grid>
        </div>
    );
  }

  render() {
    return (
      <div id = "categories">
        <div className = "title">
          Wydatki według kategorii
        </div>
        {!!this.state.categories ? <ClickableList elements = {this.categories} /> : ""}
      </div>
    );
  }
}

