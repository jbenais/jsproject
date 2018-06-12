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

    login() {
        this.setState ({
            login: true
        })
    }

    logout() {
        this.setState ({
            login: false
        })
    }
    
    render() {
        var content = !this.state.login ? <Login onLogin={() => this.login()} /> : <Home onLogout={() => this.logout()}/>
        return (
            <div>
                {content}
            </div>
        )
    }
}


export default hot(module)(App)
