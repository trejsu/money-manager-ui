import React from "react";
import PropTypes from "prop-types";

import Tabs from "../Tabs";
import Chart from "./Chart";
import HighestExpense from "./HighestExpense";
import Categories from "./Categories";

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 3,
      walletId: 0
    };
  }

  componentDidMount() {
    this.props.emitter.on("wallet-change", (walletId) => this.setState({walletId: walletId}));
  }

  onTabSelected(item) {
    this.setState({selectedTab: item});
  }

  render() {
    return (
      <div id = "statistics">
        <Tabs
          selected = {this.state.selectedTab}
          onTabSelected = {this.onTabSelected.bind(this)} />
        <div
          className = "main-container"
          id = "categories">
          <HighestExpense
            login = {this.props.login}
            walletID = {this.state.walletId}
            selected = {this.state.selectedTab} />
          <hr />
          <Categories
            login = {this.props.login}
            walletID = {this.state.walletId}
            selected = {this.state.selectedTab} />
        </div>
        {/*<Chart*/}
          {/*selected = {this.state.selectedTab}*/}
          {/*walletID = {this.state.walletId} />*/}
      </div>
    );
  }
}

Statistics.propTypes = {
  emitter: PropTypes.object,
  login: PropTypes.string
};

