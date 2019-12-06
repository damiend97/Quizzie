import React, { Component } from 'react';
import Question from './Question';

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            questions: [],
            currentQuestion: 1,
            score: 0
        }
    }

    upScore = () => {
        this.setState({
            score: this.state.score += 1
        })
    }

    upQuestion = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion += 1
        })
    }
    componentDidMount () {
        fetch('https://opentdb.com/api.php?amount=26&difficulty=easy')
        .then(res => res.json())
        .then(
            (result) => {                
                this.setState({
                    isLoaded: true,
                    questions: result.results
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded } = this.state;

        let passprops = {
            changeScore: this.upScore,
            changeQuestion: this.upQuestion,
            parentState: this.state
        }
        if (error) {
            return  <div className="flex-container">
                        <div className="error-message">Error: {error.message}</div>
                    </div>
        } else if (!isLoaded) {
            return  <div className="flex-container">
                        <div className="loader"></div>
                    </div>
        } else {
            if (this.state.currentQuestion != 26) {
                return (
                    <div>
                        <div className="stats">
                            <div className="score">score: {this.state.score}/25</div>
                            <div className="current-question">current question: {this.state.currentQuestion}/25</div>
                        </div>
                        <div className="flex-container">
                            <Question data={ passprops }></Question>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="final-score">Nice! Your final score is: { this.state.score}/25</div>
                )
            }
        }
    }
}

export default Quiz;