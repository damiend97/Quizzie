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

    playAgain = () => {
        window.location.href = "https://quizapp-c457d.web.app/";
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
                console.log(result);

                result.results.forEach(item => {
                    item.category = item.category.replace(/&quot;/g,'"');
                    item.category = item.category.replace(/&#039;/g,"'");
                    item.category = item.category.replace(/&amp;/g,"&");

                    item.correct_answer = item.correct_answer.replace(/&quot;/g,'"');
                    item.correct_answer = item.correct_answer.replace(/&#039;/g,"'");
                    item.correct_answer = item.correct_answer.replace(/&amp;/g,"&");


                    for (let i=0; i < item.incorrect_answers.length; i++) {
                        item.incorrect_answers[i] = item.incorrect_answers[i].replace(/&quot;/g,'"');
                        item.incorrect_answers[i] = item.incorrect_answers[i].replace(/&#039;/g,"'");
                        item.incorrect_answers[i] = item.incorrect_answers[i].replace(/&amp;/g,"&");
                    }
                    
                    item.question = item.question.replace(/&quot;/g,'"');
                    item.question = item.question.replace(/&#039;/g,"'");
                    item.question = item.question.replace(/&amp;/g,"&");

                    console.log(item.correct_answer);

                    /*

                    &quot;  "
                    replace(/&quot;/g,'"');

                    &#039;  '
                    replace(/&#039;/g,"'");

                    &amp;   &
                    replace(/&amp;/g,"&");

                    */
                });

                
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
                if (this.state.score === 25) {
                    return (
                        <div className="end-container">
                            <div className="final-score">Wow! Your final score was: {this.state.score}/25. Perfect!</div>
                            <div className="play-again-container">
                                <div className="play-again-button" onClick={this.playAgain}>Play Again</div>
                            </div>
                        </div>
                    )
                } else if (this.state.score < 25 && this.state.score > 20) {
                    return (
                        <div className="end-container">
                            <div className="final-score">Pretty good! Your final score was: {this.state.score}/25</div>
                            <div className="play-again-container">
                                <div className="play-again-button" onClick={this.playAgain}>Play Again</div>
                            </div>
                        </div>
                    )
                } else if (this.state.score <= 20 && this.state.score > 10) {
                    return (
                        <div className="end-container">
                            <div className="final-score">Not too bad...Your final score was: {this.state.score}/25</div>
                            <div className="play-again-container">
                                <div className="play-again-button" onClick={this.playAgain}>Play Again</div>
                            </div>
                        </div>
                    )
                } else if (this.state.score <= 10) {
                    return (
                        <div className="end-container">
                            <div className="final-score">Ouch! Your final score was: {this.state.score}/25</div>
                            <div className="play-again-container">
                                <div className="play-again-button" onClick={this.playAgain}>Play Again</div>
                            </div>
                        </div>
                    )
                }
                
            }
        }
    }
}

export default Quiz;