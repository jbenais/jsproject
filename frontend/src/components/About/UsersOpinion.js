import React from 'react';



export default class UsersOpinion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
        )
    }
}