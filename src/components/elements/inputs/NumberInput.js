import React from "react";

export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type = "number"
        name = {this.props.name}
        min = {this.props.min}
        step = {this.props.step}
        placeholder = {this.props.placeholder}
        onChange = {this.props.onChange} />
    );
  }
}