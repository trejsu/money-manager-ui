import React from "react";
import Error from "./Error";

export default class InternalServerError extends React.Component {

  render() {
    return (
      <Error
        code = "500"
        message = "Ups.. coś poszło nie tak :( Spróbuj później." />
    );
  }
}