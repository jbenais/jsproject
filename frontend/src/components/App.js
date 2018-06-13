import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './Login';
import Home from './Home';
import {connect} from "react-redux";

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
        var content = !this.props.loginReducer.is_logged ? <Login /> : <Home />
        return (
            <div>
                {content}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      loginReducer: state.loginReducer
    };
  };


export default connect(mapStateToProps)(App);
