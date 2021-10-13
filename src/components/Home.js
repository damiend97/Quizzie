import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="welcome-text"><h1>Welcome to Quizzie!</h1></div>
                <div className="link-container">
                    <Link to ="/quiz" className="start-button">Start Quiz</Link>
                </div>
            </div>
        )
    }
}

export default Home;