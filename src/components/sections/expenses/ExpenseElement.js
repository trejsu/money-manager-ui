import React from "react";
import {Grid, Col} from "react-bootstrap";

import Date from "./Date";

export default class ExpenseElement extends React.Component {
  constructor(props) {
    super(props);
  }

  get iconPath() {
    return "./resources/icons/categories/"
      + this.props.expense.category.name.replace(new RegExp(" ", "g"), "_")
      + ".svg";
  }

  render() {
    return (
      <div className = "main-container">
          <Date
            time = {this.props.expense.date}
            profit = {this.props.expense.category.profit} />
          <Grid id = "grid">
            <Col
              className = "col"
              xs = {2} sm = {2} md = {2} lg = {2} >
              <img src = {this.iconPath} />
            </Col>
            <Col
              className = "col"
              xs = {8} sm = {8} md = {8} lg = {8} >
              <div id = "category-name">
                {this.props.expense.category.name}
              </div>
              <div id = "message">
                {this.props.expense.message}
              </div>
            </Col>
            <Col
              className = "col"
              xs = {2} sm = {2} md = {2} lg = {2} >
              {this.props.expense.money.amount}
            </Col>
          </Grid>
      </div>
    );
  }
}