import React from "react";
import Error from "./Error";

export default class NotFound extends React.Component {

  render() {
    return (
      <Error
        code = "404"
        message = "Strona której szukasz nie istnieje" />
    );
  }
}