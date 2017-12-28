import React from "react";

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = "greeting">
        {this.props.user}
      </div>
    );
  }
}