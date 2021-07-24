import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

//This component is for login page when the user opens the game user is directed to the login page to select the account to login with
//When the user type url user is redirected to the login page again to login
//When the user login user redirected to the Home page 
class Login extends Component {
  state = {
    selectedUser: '',
  };
  
  //When the component mount get the pathname and save it to history to route back to it after the user login
  from = null;
  componentDidMount() {
    const { history, location: {pathname} } = this.props;
    this.from = pathname;
    history.push("/login");
  }

  handleUserSelection = (e) => {
    const selectedUser = e.target.value;
    this.setState(() => ({
       selectedUser
    }));
  };
  
  //If the user selected profile then user will be directed to the Home page route 
  //If the user typed url and logged out then logged in, the user will return on same page typed on the url from history stored
  handleUserLogin = () => {
    const { history } = this.props;
    this.props.setAuthedUser(this.state.selectedUser);
    if (this.from === "/logout" || this.from === "/login") {
      history.push("/");
    } else {
      history.push(this.from);
    }
  };

  render() {
    const { users } = this.props;
    if (!users) {
      return;
    }
    return (
      <div className="container">
        <div className="middle aligned center aligned grid">
          <div style={{ width: "600px", marginTop: "150px", textAlign:"center" }}>
            <h2 style={{ width: "400px", marginLeft:"90px", marginBottom: "30px",color:"#160023", textAlign: "center"}}>
              Login to Your Account
            </h2>
            <form className="large form">
              <div className="raised segment">
                <div className="field">
                  <select style={{ width: "300px",height:"30px", marginBottom: "30px", textAlign: "center"}} 
                    id="userId" onChange={(e) => this.handleUserSelection(e)}>
                    <option default defaultValue value="">
                      Select User
                    </option>
                    {
                      Object.keys(this.props.users).map((user) => {
                        return <option key={this.props.users[user].id}
                          value={this.props.users[user].id}>{this.props.users[user].name}</option>
                      })
                    }
                  </select>
                </div>
                <div>
                  Select a user from above and click the login button.
                </div>
                <button className="btn" style={{ width: "90px" }} onClick={this.handleUserLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};
//Connect will pass mapStateToProps function to Login component to use it as props
export default connect( mapStateToProps,{ setAuthedUser })(Login);