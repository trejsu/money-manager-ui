import React from "react";
import Error from "./Error";

export default class Unauthorized extends React.Component {

  render() {
    return (
      <Error
        code = "403"
        message = "Nie masz uprawnień do tego zasobu" />
    );
  }
}