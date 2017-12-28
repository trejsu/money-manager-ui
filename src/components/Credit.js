import React from "react";

export default class Credit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "credit">
        Icons made by &nbsp;
        <a
          href="http://www.flaticon.com/authors/freepik"
          title="Freepik">
          Freepik
        </a>
        &nbsp; from &nbsp;
        <a
          href="http://www.flaticon.com"
          title="Flaticon">
          www.flaticon.com
        </a>
        &nbsp; is licensed by &nbsp;
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank">
          CC 3.0 BY
        </a>
      </div>
    );
  }
}