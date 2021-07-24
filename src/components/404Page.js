import React, { Component } from "react";

//This component is rendered when the users enters invalid question id or when an error happens at loading any component
class PollNotFound extends Component {
  render() {
    return (
      <div>
        <h1>Poll Not Found!</h1>
        <p>Sorry! This Poll doesn't exist.</p>
      </div>
    );
  }
}

export default PollNotFound;