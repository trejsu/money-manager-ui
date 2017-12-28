import React from "react";

export default class Date extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type = "date"
        name = {this.props.name}
        min = {this.props.min}
        max = {this.props.max}
        placeholder = {this.props.placeholder}
        onChange = {this.props.onChange} />
    );
  }
}