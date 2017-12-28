import React from "react";
import Error from "./Error";

export default class Unauthenticated extends React.Component {

  render() {
    return (
      <Error
        code = "401"
        message = "Musisz się zalogować, aby uzyskać dostęp" />
    );
  }
}