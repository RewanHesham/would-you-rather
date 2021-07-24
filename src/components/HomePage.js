import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Image, Menu, Tab, Button, Label } from "semantic-ui-react";

//This is the HomePage component it renders two components of answered and unanswered questions
//This components appears directly when the user login
class HomePage extends Component {
  //This functions filters all users questions and assign each type to the corresponding list to be rendered on it's component
  //The questions are grapped by ids and when the question change it's state from answered to unanswered it's id moves to the corresponding list
  questionType = filterLogic => {
    const { questions, users, questionIds } = this.props;
    const userCards = questionIds
        .filter(filterLogic)
        .map(qid => {
        const question = questions[qid];
        const user = users[question.author];
        return (
          <div className="question-card">
            <Image className="avatar-image" floated="right" size="tiny" src={user.avatarURL} />
            <p>{user.name} asks</p>
            <div style={{color:"black"}}>
              Would you rather {question.optionOne.text} or{" "}
              {question.optionTwo.text}?
            </div>
              <Link to={`/questions/${qid}`} style={{ width: "100%" }}>
                <Button className="btn" color="black">
                  View Poll
                </Button>
              </Link> 
          </div>
        );
      });

      return userCards.length
      ? [userCards.length,<div>{userCards}</div>]
      : [userCards.length];
  };

  render() {
    const { questions, authedUser, activeIndex, handleTabChange } = this.props;

    const [ unansweredQuestionsCount,
      unansweredQuestionsContent = "All questions have been answered."
    ] = this.questionType(
      id =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    );

    const [answeredQuestionsCount,
      answeredQuestionsContent = "There are no answered questions available."
    ] = this.questionType(
      qid =>
        questions[qid].optionOne.votes.includes(authedUser) ||
        questions[qid].optionTwo.votes.includes(authedUser)
    );

    const items = [
     {menuItem: (
        <Menu.Item  className="items" key="unanswered-questions">
          Unanswered Questions<Label>{unansweredQuestionsCount}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{unansweredQuestionsContent}</Tab.Pane>
     },
      {menuItem: (
        <Menu.Item  className="items" key="answered-questions">
          Answered Questions<Label>{answeredQuestionsCount}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{answeredQuestionsContent}</Tab.Pane>
      }  
    ];
    //The user tab the menu item to change from one to the other
    return (
      <div>
        <Tab panes={items}
          activeIndex={activeIndex}
          onTabChange={(e, data) => handleTabChange(e, data)}
        />
      </div> 
    );
  }
}

//This function sort questions by time they were created at and pass props of pieces of state the HomePage component needs
function mapStateToProps({questions, authedUser, users}) {
  return {
    questionIds: Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    users,
    authedUser,
    questions,
  }
}

//Connect will pass mapStateToProps function to theHomePage component to use it as props
export default connect(mapStateToProps)(HomePage);