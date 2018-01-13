import React from "react";
import PropTypes from "prop-types";

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  get listElements() {
    return this.props.elements.map((element, index) =>
      <li key = {index}> {element} </li>
    )
  }

  render() {
    return (
      <ul>
        {this.listElements}
      </ul>
    );
  }
}

List.propTypes = {
  elements: PropTypes.array
};