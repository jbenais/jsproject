import React from 'react';


export default class Concept extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', width: '45%' }}>
                    <div style={{ margin: '30px', width: '600px', height: '600px', backgroundRepeat: 'no-repeat' }} id="love" />
                </div>
                <div style={{ display: 'flex', width: '45%', margin: '30px' }}>
                    <div style={{ display: 'flex', fontFamily: 'Roboto', flexDirection: 'column', justifyContent: 'center', padding: '50px' }}>
                        <div style={{ fontSize: '40px', fontWeight: 800, paddingBottom: '30px', textAlign: 'center' }}>
                            LE CONCEPT
                            </div>
                        <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: 300, paddingBottom: '30px' }}>
                            Célibataire ? Trouver l'amour simplement selon votre profil MBTI<br />
                            Grâce à MeetMyType, les rencontres professionnelles n'ont jamais été aussi simples !
                                </div>
                        <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: 300 }}>
                            Configure ton profil : Renseigne ton profil MBTI, ton orientation,
                                    et tes préférences amoureuses<br />
                            Découvre de nouvelles personnes qui te ressemblent !
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}