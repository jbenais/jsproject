import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './Login';
import Home from './Home';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        };
    };

    updateLogin() {
        this.setState ({
            login: true
        })
    }
    render() {
        var content = !this.state.login ? <Login onLogin={() => this.updateLogin()} /> : <Home/>
        return (
            <div>
                {content}
            </div>
        )
    }
}


export default hot(module)(App)
