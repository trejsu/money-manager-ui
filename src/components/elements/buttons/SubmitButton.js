import React from "react";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        disabled = {this.props.disabled}
        name = {this.props.name}
        type = "submit">
        {this.props.label}
      </button>
    );
  }
}