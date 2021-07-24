import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Button, Form, Image, Input } from "semantic-ui-react";
import { handleAddQuestion } from "../actions/shared";

//This components renders a new question created by the players
//The user put two options for other players to choose between in the poll
class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };
  
  //Options are then sent to the store with the question would you rather and displayed at the unanswered questions section
  //When the question is saved the user is redirected to the Home Page with both answered and unanswered questions are
  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne: optionOneText, optionTwo: optionTwoText } = this.state;
    const { handleAddQuestion } = this.props
    
    handleAddQuestion(optionOneText, optionTwoText)
    
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome:true,
    }))
  }

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];
    const { toHome } = this.state;

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h2>Create New Question</h2>
        <div className="new-question">
          <div>
            <Image className="avatar-image" src={user.avatarURL}/>
            <div className="bold ">{user.name} asks</div>
            <div><strong style={{fontSize:"xlarge"}}>Would You Rather...?</strong></div>
            <Form>
              <Form.Field>
                <Input className="input" placeholder='Enter option one here...'
                  value={this.state.optionOne}
                  onChange={e =>
                    this.setState({ optionOne: e.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <Input className="input" placeholder='Enter option two here...'
                  value={this.state.optionTwo}
                  onChange={e =>
                    this.setState({ optionTwo: e.target.value })
                  }
                />
              </Form.Field>
              <Button className="btn"  onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return { users: state.users, authedUser: state.authedUser };
};
//Connect will pass mapStateToProps function to NewQuestion component to use it as props
export default connect(mapStateToProps, { handleAddQuestion })(NewQuestion);