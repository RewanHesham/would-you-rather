import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from "../actions/authedUser";

//This component is for logging out from user's account 
//By passing null to the setAuthedUser and redirect the user to the login page
class Logout extends Component {
  componentDidMount() {
    this.props.setAuthedUser(null);
  }
  render() {
    return (
      <Redirect to="/login" />
    )
  }
}

export default connect( null,{ setAuthedUser })(Logout);