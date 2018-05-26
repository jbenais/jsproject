import React from 'react';



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
        render() {
            return (
                <div id="content">
                <div style={{ display: 'flex', justifyContent: 'center', height: '1000px' }}>
                    <div id="loginContainer">
                        <div id="welcome">
                            <b>Bienvenue sur</b>
                        </div>
                        <div id="logo">
                            <div id="meet">
                                <b>MEET</b>
                            </div>
                            <div id="my">my</div>
                            <div id="type">
                                <b>TYPE</b>
                            </div>
                        </div>
                        <div id="fb">
                            <button type="button" className="btn btn-primary btn-lg">
                                <b>Connexion avec Facebook</b>
                            </button>
                        </div>
                        <div id="or">
                            <b>OR</b>
                        </div>
                        <div id="buttonstyle">
                            <button type="button" className="btn btn-danger btn-lg">
                                <b>Connexion avec Google</b>
                            </button>
                        </div>
                        <div id="buttonstyle">
                            <button type="button" className="btn btn-link btn-lg">
                                Mot de passe oublié ?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    };