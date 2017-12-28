import React from "react";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className = {(this.props.class !== undefined) ? this.props.class : ""}
        onClick = {this.props.onClick}
        disabled = {this.props.disabled} >
        {this.props.title}
      </button>
    );
  }
}