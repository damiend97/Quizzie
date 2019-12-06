import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';

class App extends Component {   
    render() {
        return (
            <BrowserRouter >
                <div className="App">
                    <Switch >
                        <Route  exact path="/" component={ Home } />
                        <Route  path="/quiz" component={ Quiz } />"
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;