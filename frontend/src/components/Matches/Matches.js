import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import Dislike from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import Event from '@material-ui/icons/Event';
import LocationOn from '@material-ui/icons/LocationOn';
import Work from '@material-ui/icons/Work';
export default class Matches extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', width: '40%', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '30px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: '50px' }}>
                            <div style={{ display: 'flex', paddingTop: '10px', }}>
                                <img id="img" width="150px" height="150px" src="https://picsum.photos/200/200" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
                                <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: 500, fontSize: '20px', color: '#55545E' }}>
                                    Julia
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <div style={{ display: 'flex' }}>
                                        <Event /> &nbsp; 21 ans
                                        </div>
                                    <div style={{ display: 'flex' }}>
                                        <LocationOn /> &nbsp; Paris
                                        </div>
                                </div>
                                <div style={{display: 'flex', padding: '20px'}}>
                                    <Work/> &nbsp; Étudiante
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', flexDirection: 'column', width: '45%', backgroundColor: 'white', borderRadius: '5px', boxShadow: '2px 1px 10px 1px #E6E6E6'}}>
                                <div style={{display: 'flex', fontFamily: 'Roboto', fontSize: '14px', color: '#9AA7AD', paddingBottom: '10px', margin: '10px'}}>
                                Profil MBTI
                                </div>
                                <div style={{display: 'flex', fontFamily: 'Roboto', fontWeight: 700, fontSize: '20px', color: '#FBBB06', margin: '0 auto'}}>
                                ENFJ
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '5px',  width: '45%', boxShadow: '2px 1px 10px 1px #E6E6E6'}}>
                                <div style={{display: 'flex', fontFamily: 'Roboto', fontSize: '14px', color: '#9AA7AD', paddingBottom: '10px', margin: '10px'}}>
                                    Description
                                </div>
                                <div style={{display: 'flex', fontFamily: 'Roboto', fontWeight: 300, fontSize: '14px', color: '#FBBB06', margin: '10px'}}>
                                    Bonjour, moi c'est Julia. J'aime la danse, le développement iOS, le cinéma et dormir.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                        <Button variant="fab" style={{ color: '#FF5D65', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                            <Dislike />
                        </Button>
                        <Button variant="fab" style={{ color: '#22D894', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                            <Favorite />
                        </Button>
                    </div>
                </div>
            </div >
        )
    }
}