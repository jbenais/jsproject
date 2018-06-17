import React from 'react';

// JULIA: Display des messages avec un input en bas et un event (bouton send / enter)
export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentWillMount() {
        this.fetchMatches()
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    Julia
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    Amigo
                </div>
            </div>
        )
    }
}