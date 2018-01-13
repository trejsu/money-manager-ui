import React from "react";
import Waypoint from "react-waypoint";
import PropTypes from "prop-types";

import List from "./List";

export default class ContinuousScrollingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <List elements = {this.props.elements}/>
        <div id = "waypoint">
          <Waypoint onEnter = {this.props.onEnter}/>
          {this.props.isLoading ? "Loading more items…" : ""}
        </div>
      </div>
    );
  }
}

ContinuousScrollingList.propTypes = {
  elements: PropTypes.array,
  onEnter: PropTypes.func,
  isLoading: PropTypes.bool
};