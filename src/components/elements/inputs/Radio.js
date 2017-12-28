import React from "react";

export default class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = "radio">
        <input
          type = "radio"
          name = {this.props.name}
          value = {this.props.value}
          onChange = {this.props.onChange} />
        {this.props.label}
      </div>
    );
  }
}