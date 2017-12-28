import React from "react";

export default class Tick extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img
        src = "./icons/checked.svg"
        className = "tick" />
    );
  }
}