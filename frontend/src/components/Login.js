import React from 'react';
import Logo from './Logo';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import * as LoginAction from '../actions/LoginAction';
import { connect } from "react-redux";
const keys = require('./data.json');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.responseGoogle = this.responseGoogle.bind(this);
    }


    responseGoogle(response) {
        console.log(response);
        let data = {
            access_token: response.profileObj.googleId,
            email: response.profileObj.email,
            is_google: true,
        }
        this.props.login(data);
    }

    responseFacebook(response) {
        console.log(response);
        if (!response.status) {
            let data = {
                access_token: response.accessToken,
                is_google: false
            };
            this.props.login(data);
        }
        
    }

    render() {
        return (
            <div id="content">
                <div style={{ display: 'flex', justifyContent: 'center', height: '-webkit-fill-available' }}>
                    <div id="loginContainer">
                        <div id="welcome">
                            <b>Bienvenue sur</b>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Logo />
                        </div>
                        <div className="tagline">
                            Trouver l'amour selon son profil&nbsp; <b>MBTI</b>
                        </div>
                        <div id="fb">
                            <div style={{ width: '75%' }}>
                                <FacebookLogin
                                    cssClass="btnFacebook"
                                    textButton="CONNEXION AVEC FACEBOOK"
                                    appId={keys.facebookId}
                                    autoLoad={true}
                                    scope="public_profile, email, user_birthday"
                                    fields="name,email,picture, birthday, gender"
                                    callback={this.responseFacebook.bind(this)} />
                            </div>
                        </div>
                        <div id="or">
                            <b>OR</b>
                        </div>
                        <div id="buttonstyle">
                            <GoogleLogin
                                style={{
                                    fontFamily: 'Roboto', color: 'white', fontWeight: 600,
                                    height: '50px', width: '75%', backgroundColor: '#FE0000'
                                }}
                                clientId={keys.googleId}
                                className="google-login"
                                scope="profile email"
                                fetchBasicProfile={false}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                buttonText="CONNEXION AVEC GOOGLE" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        ...state.loginReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (response) => {
            LoginAction.login(response)(dispatch);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
