import React from 'react';



export default class Usage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', paddingBottom: '50px', fontFamily: 'Roboto', fontWeight: 600 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id="settings" style={{ marginBottom: '20px' }} />
                    <div>CONFIGURE TON PROFIL</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id="match" style={{ marginBottom: '20px' }} />
                    <div>MATCHES DES PROFILS</div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id="chat" style={{ marginBottom: '20px' }} />
                    <div>DISCUTES AVEC EUX</div>

                </div>
            </div>
        )
    }
}