import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '400px', background: 'linear-gradient(to right, #F7798E , #F48477)'}}>
                <div style={{display: 'flex', fontFamily: 'Roboto', textAlign: 'center', fontWeight: 800, fontSize: '40px', color: 'white', width: '60%'}}>
                <p>UN PROFIL. UNE RENCONTRE. UNE HISTOIRE...<br/>
                TROUVER L'AMOUR SELON VOTRE PROFIL MBTI</p>
                </div>
            </div>
        )
    }
}