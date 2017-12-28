import React from "react";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className = "main-container"
        id = "chart">
        Wykresy w budowie <br/>
        selected: {this.props.selected} <br/>
        wallet: {this.props.walletID}
      </div>
    );
  }
}

