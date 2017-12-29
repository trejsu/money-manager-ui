import React from "react";
import {Grid, Col} from "react-bootstrap";
import Moment from "moment";

export default class StatisticsExpenseElement extends React.Component {
  constructor(props) {
    super(props);
  }

  get iconPath() {
    return "./resources/icons/categories/"
      + this.props.expense.category.name.replace(new RegExp(" ", "g"), "_")
      + ".svg";
  }

  get date() {
    Moment.locale("pl");
    return Moment(this.props.expense.date).format('D MMMM YYYY');
  }

  get category() {
    return this.props.expense.category.name;
  }

  render() {
    return (
      <div className = "statistics-expense">
        <Grid id = "grid">
          <Col
            className = "col"
            xs = {3} sm = {3} md = {3} lg = {3} >
            <img src = {this.iconPath} />
          </Col>
          <Col
            className = "col"
            xs = {7} sm = {7} md = {7} lg = {7} >
            <div id = "category-name">
              {this.category}
            </div>
            <div id = "message">
              {this.props.expense.message}
            </div>
            <div id = "date">
              {this.date}
            </div>
          </Col>
          <Col
            className = "col"
            xs = {2} sm = {2} md = {2} lg = {2} >
            <div id = "amount">
              {this.props.expense.amount}
            </div>
          </Col>
        </Grid>
      </div>
    );
  }
}