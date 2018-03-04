import React from "react";
import {Col, Grid, Row} from "react-bootstrap";
import Moment from "moment";
import PropTypes from "prop-types";

class Date extends React.Component {
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
      <div className = "date" id = {this.props.profit ? "inflow" : "outflow"}>
        <Grid id = "grid">
          <Row>
            <Col className = "col" id = "day" xs = {2} sm = {2} md = {2} lg = {2}>
              {this.date.format('D')}
            </Col>
            <Col className = "col" xs = {8} sm = {8} md = {8} lg = {8}>
              <div>
                {this.date.format('MMMM YYYY')}
              </div>
              <div id = "moment">
                {this.moment}
              </div>
            </Col>
            <Col className = "col" id = "remove" xs = {2} sm = {2} md = {2} lg = {2}>
              <div id = "delete" onClick = {this.props.onDelete}>
                <img src = "./resources/icons/delete.svg" />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Date.propTypes = {
  time: PropTypes.string,
  profit: PropTypes.bool,
  onDelete: PropTypes.func
};

export default Date;