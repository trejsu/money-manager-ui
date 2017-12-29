import React from "react";
import {Grid, Col} from "react-bootstrap";
import Progress from "react-progressbar";
import Moment from "moment";

export default class BudgetElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {exceeded: this.props.budget.current > this.props.budget.total}
  }

  componentWillReceiveProps(props) {
    if (this.budgetChanged(props.budget)) {
      this.update(props);
    }
  }

  update(props) {
    this.setState({exceeded: props.budget.current > props.budget.total});
  }

  budgetChanged(budget) {
    return JSON.stringify(budget) !== JSON.stringify(this.props.budget);
  }

  get iconPath() {
    return "./resources/icons/categories/"
      + this.props.budget.category.name.replace(new RegExp(" ", "g"), "_")
      + ".svg";
  }

  get percentage() {
    return (this.props.budget.current * 100) / this.props.budget.total;
  }

  get color() {
    if (this.percentage > 75) {
      return "red"
    }
    return "green";
  }

  get period() {
    Moment.locale("pl");
    return Moment(this.props.budget.start).format("DD MMM")
      + " - "
      + Moment(this.props.budget.end).format("DD MMM");
  }

  get daysLeft() {
    return Moment(this.props.budget.end, "YYYY-MM-DD").fromNow();
  }

  get amountLeft() {
    let difference = this.props.budget.total - this.props.budget.current;
    let amount = this.state.exceeded ? -difference : difference;
    return amount.toFixed(2);
  }

  get id() {
    if (this.state.exceeded) {
      if (this.props.completed) {
        return "completed-exceeded";
      } else {
        return "exceeded"
      }
    } else if (this.props.completed) {
      return "completed";
    }
    return "";
  }

  render() {
    return (
      <div
        className = "main-container"
        id = {this.id}>
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
              {this.props.budget.category.name}
            </div>
            <div id = "message">
              {this.period}
            </div>
          </Col>
        </Grid>
        <div id = "amount-left">
          <span className = "left">
            {this.state.exceeded ? "przekroczono o" : "pozostało"}
          </span>
          <span className = "right">
            {this.amountLeft}
          </span>
        </div>
        <div id = "days-left">
          <span className = "right">
            koniec {this.daysLeft}
          </span>
        </div>
        <div id = "progress" className = {this.color}>
          <Progress completed = {this.state.exceeded ? 100 : this.percentage} />
        </div>
      </div>
    );
  }
}