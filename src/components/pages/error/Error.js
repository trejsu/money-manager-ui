import React from "react";
import {Link} from "react-router";

import Button from "../../elements/buttons/Button";
import Credit from "../../Credit";

export default class Error extends React.Component {

  render() {
    return (
      <div>
        <div
          className = "main-container"
          id = "error">
          <div id = "code">
            {this.props.code}
          </div>
          <img src = {"./resources/icons/error/" + this.props.code + ".svg"} />
          <div id = "error-message">
            {this.props.message}
          </div>
          <Link to = "/">
            <Button title = "wróć do strony głównej" />
          </Link>
        </div>
        <Credit/>
      </div>
    );
  }
}