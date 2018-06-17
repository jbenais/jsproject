import React from 'react';
import * as LoginAction from '../actions/LoginAction';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Profile from './Profile/Profile';
import About from './About/About';
import Messages from './Messages/Messages';
import Matches from './Matches/Matches';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { connect } from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event, value) {
        this.setState({
            value: value
        });
    };

    render() {
        return (
            <div>
                <div className="header">
                    <div style={{ margin: '0 auto' }}>
                        <div id="logo">
                            <div id="meet" style={{ color: 'white' }}>
                                <b>MEET</b>
                            </div>
                            <div id="my">my</div>
                            <div id="type" style={{ color: 'white' }}>
                                <b>TYPE</b>
                            </div>
                        </div>
                    </div>
                    <div className="poweroff">
                        <IconButton aria-label="Delete" onClick={this.props.logout}>
                            <PowerSettingsNew />
                        </IconButton>
                    </div>

                </div>
                <Tabs value={this.state.value}
                    style={{ border: '0', backgroundColor: 'white'}}
                    fullWidth={true}
                    centered={true}
                    onChange={this.handleChange}>
                    <Tab label="À propos" />
                    <Tab label="Match" />
                    <Tab label="Messages" />
                    <Tab label="Profil" />
                </Tabs>
                    {this.state.value === 0 && <About />}
                    {this.state.value === 1 && <Matches data={this.props.loginReducer.user_general}/>}
                    {this.state.value === 2 && <Messages data={this.props.loginReducer}/>}
                    {this.state.value === 3 && <Profile data={this.props.loginReducer}/>}
            </div >

        )
    }
}

const mapStateToProps = (state) => {
    return {
      loginReducer: state.loginReducer
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => {
        dispatch(LoginAction.logout());
      },
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Home);