import React from 'react';
import Logo from './Logo';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Profil from './Profile/Profil';
import About from './About/About';
import Messages from './Messages/Messages';
import Matches from './Matches/Matches';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event, value) {
        this.setState({
            value: value
        });
    };

    render() {
        /* const test =  <div style={{ justifyContent: 'flex-end' }}>
         <PowerSettingsNew />
         </div>*/
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Logo />
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <PowerSettingsNew />
                    </div>

                </div>
                <Tabs value={this.state.value}
                    style={{ padding: '30px', border: '0' }}
                    fullWidth={true}
                    centered={true}
                    onChange={this.handleChange}>
                    <Tab label="À propos" />
                    <Tab label="Match" />
                    <Tab label="Messages" />
                    <Tab label="Profil" />
                </Tabs>

                {this.state.value === 0 && <div><About /></div>}
                {this.state.value === 1 && <div><Matches /></div>}
                {this.state.value === 2 && <div><Messages /></div>}
                {this.state.value === 3 && <div><Profil /></div>}
            </div >

        )
    }
}