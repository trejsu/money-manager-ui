import React from "react";
import {Col, Grid} from "react-bootstrap";
import Moment from "moment";

export default class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  get date() {
    Moment.locale("pl");
    return Moment(this.props.time);
  }

  get moment() {
    if (Moment(new Date()).diff(this.date, "days") > 1) {
      return this.date.from(new Date());
    }
    return this.date.calendar().split(' ')[0];
  }

  render() {
    return (
      <div
        className = "date"
        id = {this.props.profit ? "inflow" : "outflow"}>
        <Grid id = "grid">
        <Col
          className = "col"
          id = "day"
          xs = {2} sm = {2} md = {2} lg = {2} >
          {this.date.format('D')}
        </Col>
        <Col
          className = "col"
          xs = {10} sm = {10} md = {10} lg = {10} >
          <div>
            {this.date.format('MMMM YYYY')}
          </div>
          <div id = "moment">
            {this.moment}
          </div>
        </Col>
        </Grid>
      </div>
    );
  }
}