import React from "react";
import Moment from "moment";

import List from "../elements/List";

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
  }

  get tabs() {
    Moment.locale("pl");
    let tabs = [];
    tabs.push(Moment().format("YYYY"));
    tabs.push(Moment().subtract(2, "months").format("MMM"));
    tabs.push(Moment().subtract(1, "months").format("MMM"));
    tabs.push(Moment().format("MMM"));
    return tabs;
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