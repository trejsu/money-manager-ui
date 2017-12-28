import React from "react";

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  get listElements() {
    return this.props.elements.map((element, index) =>
        <li
          key = {index}
          onClick = {(event) => this.props.onClick(index)}
          className = {(this.props.selectedItem === index) ? "selected" : ""}>
          {element}
        </li>
    );
  }

  render() {
    return (
      <ul>
        {this.listElements}
      </ul>
    );
  }
}