import React from 'react';
import Conversation from './Conversation';
import MatchesList from './MatchesList';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flex: 1}}>
                    <MatchesList/>
                </div>
                <div style={{display: 'flex', flex: 4}}>
                    <Conversation/>
                    
                </div>
            </div>
        )
    }
}