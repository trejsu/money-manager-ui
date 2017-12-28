import React from "react";
import {browserHistory} from "react-router";
import {Col, Grid} from "react-bootstrap";

import DateGenerator from "../../../util/DateGenerator";
import Server from "../../../services/Server";
import List from "../../elements/List";

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
    return Object.keys(this.state.categories).map((value, index) =>
      <div key = {index}>
        <Grid id = "grid">
          <Col
            className = "category-col"
            lg = {7} md = {7} sm = {7} xs = {7}>
            <span id = "category">
              {value}
            </span>
          </Col>
          <Col
            className = "category-col"
            lg = {3} md = {3} sm = {3} xs = {3}>
            <span id = "amount">
              {this.state.categories[value]}
            </span>
          </Col>
          <Col
            className = "category-col"
            lg = {2} md = {2} sm = {2} xs = {2}>
            <span id = "percentage">
              ({(this.state.categories[value] * 100 / this.sum).toFixed(0)}%)
            </span>
          </Col>
        </Grid>
        </div>
    );
  }

  get sum() {
    let sum = 0;
    Object
      .keys(this.state.categories)
      .forEach((value, index) => sum += this.state.categories[value]);
    return sum;
  }

  render() {
    return (
      <div id = "categories">
        <div className = "title">
          Wydatki według kategorii
        </div>
        {!!this.state.categories ? <List elements = {this.categories} /> : ""}
      </div>
    );
  }
}

