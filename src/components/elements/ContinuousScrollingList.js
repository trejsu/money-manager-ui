import React from "react";
import Waypoint from "react-waypoint";

import List from "./List";

export default class ContinuousScrollingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <List
          elements = {this.props.elements}
          selectedItem = {this.props.selected} />
        <div id = "waypoint">
          <Waypoint onEnter = {this.props.onEnter}/>
          {this.props.isLoading ? "Loading more items…" : ""}
        </div>
      </div>
    );
  }
}