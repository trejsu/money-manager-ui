import React from "react";

export default class Tick extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img
        src = "./resources/icons/checked.svg"
        className = "tick" />
    );
  }
}