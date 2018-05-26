import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './Login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div>
                <Login/>
            </div>
        )
    }
}


export default hot(module)(App)
