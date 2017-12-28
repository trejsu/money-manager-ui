import React from "react";

export default class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type = "text"
        name = {this.props.name}
        placeholder = {this.props.placeholder}
        onChange = {this.props.onChange} />
    );
  }
}