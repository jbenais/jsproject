import React from 'react';
import Logo from './Logo';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import * as LoginAction from '../actions/LoginAction';
import { connect } from "react-redux";
import { resolve } from 'path';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle(response) {
        console.log(response.accessToken);
        console.log(response);

        fetch('http://localhost:8888/user', {
            method: 'POST',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    google_id: response.profileObj.googleId,
                    email: response.profileObj.email
                },
                is_google: true
            })
        })
    }

    responseFacebook(response) {
        console.log(response);
        let state = {
            login: '',
            token: response.accessToken,
            email: response.email,
            name: response.name
        };
        this.props.login(state);
        fetch('http://localhost:8888/user', {
            method: 'POST',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    access_token: response.accessToken
                },
                is_google: false
            })
        });
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
                        <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: 400, fontSize: '20px', justifyContent: 'center', paddingTop: '30px', textAlign: 'center' }}>
                            Trouver l'amour selon son profil&nbsp; <b>MBTI</b>
                        </div>
                        <div id="fb">
                            <div style={{ width: '75%' }}>

                                <FacebookLogin
                                    cssClass="btnFacebook"
                                    textButton="CONNEXION AVEC FACEBOOK"
                                    appId="1070554803153257"
                                    autoLoad={true}
                                    cookie={true}
                                    scope="public_profile, email, user_birthday"
                                    fields="name,email,picture, birthday, gender"
                                    onClick={this.props.onLogin}
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
                                clientId="858362894339-vvqqtpnjnnkqu4klhsv9ob4memvtkkr1.apps.googleusercontent.com"
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
            dispatch(LoginAction.login(response));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);