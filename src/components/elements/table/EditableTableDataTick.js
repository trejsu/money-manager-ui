import React from "react";
import Tick from "./Tick";

export default class EditableTableDataTick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked
    }
  }

  onClick() {
    this.setState((state, props) => {
      return {
        checked: !state.checked,
      }
    }, () => this.props.onChange(this.props.login, this.state.checked));

  }

  render() {
    return (
      <td
        className = "editable-tick"
        onClick = {this.onClick.bind(this)}>
        {this.state.checked ? <Tick /> : ""}
      </td>
    );
  }
}