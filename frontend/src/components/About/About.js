import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', width: '45%' }}>
                            <div style={{ margin: '30px', width: '600px', height: '600px', backgroundRepeat: 'no-repeat' }} id="love" />
                        </div>
                        <div style={{ display: 'flex', width: '45%', margin: '30px' }}>
                            <div style={{ display: 'flex', fontFamily: 'Roboto', flexDirection: 'column', justifyContent: 'center', padding: '50px' }}>
                                <div style={{ fontSize: '40px', fontWeight: 800, paddingBottom: '30px' }}>
                                    LE CONCEPT
                            </div>
                                <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: 300, paddingBottom: '30px' }}>
                                    Célibataire ? Trouver l'amour simplement selon votre profil MBTI<br />
                                    Grâce à MeetMyType, les rencontres professionnelles n'ont jamais été aussi simples !
                                </div>
                                <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: 300 }}>
                                    Configure ton profil : Renseigne ton profil MBTI, ton orientation,
                                    et tes préférences amoureuses<br/>
                                    Découvre de nouvelles personnes qui te ressemblent !
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontSize: '40px', fontWeight: 800, padding: '50px' }}>
                        COMMENT ÇA MARCHE ?
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingBottom: '50px', fontFamily: 'Roboto', fontWeight: 600 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div id="settings" style={{marginBottom: '20px'}}/>
                            <div>CONFIGURE TON PROFIL</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
                            <div id="match" style={{marginBottom: '20px'}}/>
                            <div>MATCHES DES PROFILS</div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
                            <div id="chat" style={{marginBottom: '20px'}} />
                            <div>DISCUTES AVEC EUX</div>

                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', width: '30%', backgroundColor: 'white', margin: '10px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'white' }}>
                                <img style={{ marginBottom: '20px' }} src="https://webassets.lovoo.com/images/homepage/story-1.jpg" />
                                <div style={{ fontFamily: 'Roboto', textAlign: 'center', fontWeight: 800, fontSize: '20px', color: '#888', marginBottom: '15px' }}>
                                    Farah, 21 ans
                                </div>
                                <div style={{ fontFamily: 'Roboto', textAlign: 'center', fontWeight: 300, fontSize: '16px', padding: '10px' }}>
                                    <i>"</i> J'ai trouvé l'amour grâce à votre service car je cherchais quelqu'un qui me ressemblait
                                    dans le travail. Nous sommes en couple depuis bientôt 2 ans maintenant ! <i>"</i>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '30%', backgroundColor: 'white', margin: '10px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', backgroundcolor: 'white' }}>
                                <img style={{ marginBottom: '20px', height: '250px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqWTN1qguZ06cN26zwS4V8CyC33XzCyVEtc_XheZnp7_byb0QoyQ" />
                                <div style={{ fontFamily: 'Roboto', textAlign: 'center', fontWeight: 800, fontSize: '20px', color: '#888', marginBottom: '15px' }}>
                                    Quentin, 28 ans
                                </div>
                                <div style={{ fontFamily: 'Roboto', textAlign: 'center', fontWeight: 300, fontSize: '16px', padding: '10px' }}>
                                    <i>"</i> Pour un coup d'un soir ou pour toute la vie, MeetMyType a su me trouver des profils qui correspondaient
                                    à ce que je recherchais !  <i>"</i>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '30%', backgroundColor: 'white', margin: '10px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                <img style={{ marginBottom: '20px' }} src="https://webassets.lovoo.com/images/homepage/story-2.jpg" />
                                <div style={{ fontFamily: 'Roboto', textAlign: 'center', fontWeight: 800, fontSize: '20px', color: '#888', marginBottom: '15px' }}>
                                    Noémie et Valentin, 22 et 23 ans
                                </div>
                                <div style={{ fontFamily: 'Roboto', textAlign: 'center', fontWeight: 300, fontSize: '16px', padding: '10px' }}>
                                    <i>"</i> Nous nous croisions tous les jours au travail et pourtant nous ne nous connaissions pas.
                                    Grâce à vous, nous nous sommes découverts dans notre propre entreprise !<i>"</i>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div >



        )
    }
}