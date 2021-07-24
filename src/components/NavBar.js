import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

//This components renders the Navbar which contains all links to the different pages of Would You Rather Game
class NavBar extends Component {
  render() {
    const { users, authedUser } = this.props;
    const { name, avatarURL } = users[authedUser];

    return (
      <div className="navBar">
          <NavLink to="/" exact className="header item" >
            Home
          </NavLink>
          <NavLink to="/add" exact className="item" >
            New Question
          </NavLink>
          <NavLink to="/leaderboard" exact className="item" >
            Leader Board
          </NavLink>
          <span className="item signed-in-user">Hello, {name}</span>
          <img className="avatar-image" src={avatarURL} alt="" />
          <NavLink to="/logout" exact className="item" >
            Logout
          </NavLink>
      </div>
    );
  }
}

//Here the mapStateToProps fn. return props to the NavBar Components to be used from the Redux state 
const mapStateToProps = state => {
  return { authedUser: state.authedUser, users: state.users };
};

//Connect passes the maoStateToProps to Navbar Component as props
export default connect(mapStateToProps)(NavBar);