import React from "react";
import List from "../../elements/List";

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
          <List
            elements = {this.tabs}
            onClick = {this.props.onTabSelected}
            selectedItem = {this.props.selected} />
        </div>
      </div>
    );
  }
}