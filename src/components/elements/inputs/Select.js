import React from "react";

export default class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <select
        name = {this.props.name}
        onChange = {this.props.onChange}
        defaultValue = {this.props.default}
        disabled = {this.props.disabled}>
        <option
          disabled
          style = {{display: "none"}}>
          {this.props.default}
        </option>
        {this.props.options}
      </select>
    );
  }
}