import React, { Component } from 'react';

class Questions extends Component {
    componentDidMount() {
        console.log("Current question: " + this.props.data.parentState.currentQuestion  + "/25");
    }

    handleAnswer = (e) => {
        if  (e.currentTarget.innerText === this.props.data.parentState.questions[this.props.data.parentState.currentQuestion].correct_answer) {
            console.log("correct");
            this.props.data.changeScore();
            console.log("Score: " + this.props.data.parentState.score + "/25");
        } else {
            console.log("incorrect");
            console.log("Score: " + this.props.data.parentState.score + "/25");
        }

        this.nextQuestion();
    }

    nextQuestion = () => {
        this.props.data.changeQuestion();
        console.log("Current question: " + this.props.data.parentState.currentQuestion  + "/25");
    }

    render() {
        if (this.props.data.parentState.questions[this.props.data.parentState.currentQuestion] === undefined) {
            return (
                <div className="error-message">Sorry...Unable to connect to API</div>
            )
        } else {
            return(
            <div className="question">
                <div className="category">
                    { this.props.data.parentState.questions[this.props.data.parentState.currentQuestion].category.toUpperCase().replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&Uuml;/g,"U") }
                </div>
                
                <br />

                <div className="question-text">
                    { this.props.data.parentState.questions[this.props.data.parentState.currentQuestion].question.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&Uuml;/g,"U") }
                </div>

                <br />
            <div className="answer" onClick={this.handleAnswer}>{ this.props.data.parentState.questions[this.props.data.parentState.currentQuestion].correct_answer.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&Uuml;/g,"U")}</div>
                { this.props.data.parentState.questions[this.props.data.parentState.currentQuestion].incorrect_answers.map((value, index) => {
                    return <div key={index} className="answer" onClick={this.handleAnswer}>{value.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&Uuml;/g,"U")}<br /></div>
                }) }
            </div>
            )
        }
    }
}

export default Questions;