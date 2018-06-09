import React from 'react';
import Logo from './Logo';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { resolve } from 'path';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.responseGoogle = this.responseGoogle.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    responseGoogle(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        var googleId = googleUser.getId();

        console.log({ googleId });
        console.log({ accessToken: id_token });
        this.signUp(googleUser.getAuthResponse);
        //anything else you want to do(save to localStorage)...
    }

    signUp(res) {
        /*let baseUrl = 'http://localhost:8888/user';
        return new Promise((resolve, reject) => {
            fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify(res.body)
            })
            .then((response) => response.json())
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
            }) 
        })*/
    }


    render() {
        const responseFacebook = (response) => {
             console.log(response);
             this.signUp(response);
         }
        /*var test = (<button type="button" className="btn btn-primary btn-lg">
            <b>Connexion avec Facebook</b>
        </button>);
        <button type="button" className="btn btn-danger btn-lg">
                                <b>Connexion avec Google</b>
                            </button>*/
        return (
            <div id="content">
                <div style={{ display: 'flex', justifyContent: 'center', height: '-webkit-fill-available' }}>
                    <div id="loginContainer">
                        <div id="welcome">
                            <b>Bienvenue sur</b>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Logo />
                        </div>
                        <div id="fb">
                            <FacebookLogin
                                cssClass="btnFacebook"
                                textButton="CONNEXION AVEC FACEBOOK"
                                appId="1070554803153257"
                                autoLoad={true}
                                cookie={true}
                                scope="public_profile, email, user_birthday"
                                fields="name,email,picture, birthday, gender"
                                onClick={this.props.onLogin}
                                callback={responseFacebook} />
                        </div>
                        <div id="or">
                            <b>OR</b>
                        </div>
                        <div id="buttonstyle">
                            <GoogleLogin
                                style={{fontFamily: 'Roboto', color: 'white', fontWeight: 600,
                                height: '50px', width: '75%', backgroundColor: '#FE0000'}}
                                clientId="858362894339-vvqqtpnjnnkqu4klhsv9ob4memvtkkr1.apps.googleusercontent.com"
                                className="google-login"
                                scope="profile"
                                fetchBasicProfile={false}
                                onSuccess={this.responseGoogle}
                                buttonText="CONNEXION AVEC GOOGLE" />  
                        </div>
                        <div id="buttonstyle">
                            <button type="button" onClick={this.props.onLogin} className="btn btn-link btn-lg">
                                Mot de passe oublié ?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};