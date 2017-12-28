import React from "react";

export default class Password extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type = "password"
        name = {this.props.name}
        placeholder = {this.props.placeholder} />
    );
  }
}