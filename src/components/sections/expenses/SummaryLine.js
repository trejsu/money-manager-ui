import React from "react";

export default class SummaryLine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = {this.props.id}>
        <span id = "title">
          {this.props.title}
        </span>
        <span id = "amount">
          {this.props.amount.toFixed(2)}
        </span>
      </div>
    );
  }
}