import React from 'react';
import Concept from './Concept';
import Usage from './Usage';
import UsersOpinion from './UsersOpinion';

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
                    <Concept/>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontSize: '40px', fontWeight: 800, padding: '50px' }}>
                        COMMENT ÇA MARCHE ?
                    </div>
                    <Usage/>
                   <UsersOpinion/>
                </div>
            </div >
        )
    }
}