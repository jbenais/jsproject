import React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div style={{color: 'red'}}>
                BONJOUR
            </div>
            )
    }
}


export default hot(module)(App)
