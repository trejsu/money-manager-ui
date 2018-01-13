import React from "react";
import PropTypes from "prop-types";

export default class ClickableList extends React.Component {
  constructor(props) {
    super(props);
  }

  get listElements() {
    return this.props.elements.map((element, index) =>
        <li
          key = {index}
          onClick = {() => this.props.onClick(index)}
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

ClickableList.propTypes = {
  elements: PropTypes.array,
  onClick: PropTypes.func,
  selectedItem: PropTypes.number
};