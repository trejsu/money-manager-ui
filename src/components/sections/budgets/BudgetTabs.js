import React from "react";
import ClickableList from "../../elements/ClickableList";
import PropTypes from "prop-types";

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
  }

  get tabs() {
    return ["zakończone", "w trakcie", "przyszłe"];
  }

  render() {
    return (
      <div
        className = "main-container"
        id = "tabs">
        <div className = "horizontal-list">
          <ClickableList
            elements = {this.tabs}
            onClick = {this.props.onTabSelected}
            selectedItem = {this.props.selected} />
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  onTabSelected: PropTypes.func,
  selected: PropTypes.number
};