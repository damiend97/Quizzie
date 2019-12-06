import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <Link to ="/quiz" className="start-button">Start Quiz</Link>
        )
    }
}

export default Home;