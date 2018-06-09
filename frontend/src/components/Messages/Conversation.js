import React from 'react';


export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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