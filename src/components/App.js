import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Menu from "./NavBar";
import HomePage from "./HomePage";
import NewQuestion from "./NewQuestion";
import Question from "./Question";
import LeaderBoard from "./LeaderBoard";
import Logout from "./Logout";
import PollNotFound from "./404Page";

//This is the main app components which renders all components together to create the Web App
class App extends Component {
  //activeIndex is used to detrmine unanswered or answered questions will be displayed and it's set to 0 to show unanswared as default
  state = { activeIndex: 0 };

  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });
  };
   
  //Get the initial data of users and questions when this component mount 
  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();
  }

  //The router will initially render the login page then after the user login, user can change between routes from the NavBar
  render() {
    const { authedUser } = this.props;

    if (!authedUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <Fragment>
          <h1 className= "App-header">WOULD YOU RATHER?</h1>
          <Menu />
          <div>
            <Switch>
              <Route path="/" exact
                render={() => {
                  return (
                    <HomePage handleTabChange={this.handleTabChange} activeIndex={this.state.activeIndex}/>
                  );
                }}
              />
              <Route path="/add"
                render={history => {
                  return (
                    <NewQuestion history={history.history}/>
                  );
                }}
              />
              <Route path="/questions/:question_id" component={Question} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/logout" component={Logout} />
              <Route path="/404Page" component={PollNotFound} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => { 
  const { authedUser } = state;
  return { authedUser };
};

//Connect will pass mapStateToProps and handleInitialData functions to the App component to use it as props
export default connect( mapStateToProps, { handleInitialData })(App);