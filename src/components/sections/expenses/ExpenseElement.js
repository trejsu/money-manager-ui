import React from "react";
import {Grid, Col, Row} from "react-bootstrap";
import PropTypes from "prop-types";

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

  onDelete() {
    this.props.onDelete(this.props.expense.id)
  }

  render() {
    return (
      <div className = "main-container">
        <Date time = {this.props.expense.date}
              profit = {this.props.expense.category.profit}
              onDelete = {this.onDelete.bind(this)} />
        <Grid id = "grid">
          <Row>
            <Col className = "col" xs = {2} sm = {2} md = {2} lg = {2}>
              <img src = {this.iconPath} />
            </Col>
            <Col className = "col" xs = {8} sm = {8} md = {8} lg = {8}>
              <div id = "category-name">
                {this.props.expense.category.name}
              </div>
              <div id = "message">
                {this.props.expense.message}
              </div>
            </Col>
            <Col className = "col" xs = {2} sm = {2} md = {2} lg = {2}>
              {this.props.expense.amount.amount}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ExpenseElement.propTypes = {
  expense: PropTypes.object,
  onDelete: PropTypes.func
};