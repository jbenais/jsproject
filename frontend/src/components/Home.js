import React from 'react';
import Logo from './Logo';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Profil from './Profile/Profil';
import About from './About/About';
import Messages from './Messages/Messages';
import Matches from './Matches/Matches';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import {connect} from "react-redux";

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
                <div style={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(to right, #F7798E , #F48477)', height: '100px' }}>
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
                    <p>{this.props.loginReducer.name}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <IconButton aria-label="Delete" onClick={this.props.onLogout}>
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
                    {this.state.value === 1 && <Matches />}
                    {this.state.value === 2 && <Messages />}
                    {this.state.value === 3 && <Profil />}
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