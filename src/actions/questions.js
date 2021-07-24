export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions (questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    };
  }
  
export function saveQuestionAnswer(id, answer, authedUser) {
    return {
        type: SAVE_QUESTION_ANSWER,
        id,
        answer,
        authedUser
    };
}
  